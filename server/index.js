const fetch = require('node-fetch');
require('dotenv/config');
const path = require('path');
const express = require('express');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const errorMiddleware = require('./error-middleware');
const ClientError = require('./client-error');
const uploadsMiddleware = require('./uploads-middleware');
const pg = require('pg');
const app = express();
const publicPath = path.join(__dirname, 'public');
const yelp = require('yelp-fusion');
const client = yelp.client(process.env.YELP_NPM_AUTHORIZATION);
const authorizationMiddleware = require('./authorization-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(require('./dev-middleware')(publicPath));
} else {
  app.use(express.static(publicPath));
}

app.post('/api/auth/sign-up', async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  try {
    const hashedPassword = await argon2.hash(password);
    const sql = `
      insert into "users" ("username", "hashedPassword")
      values ($1, $2)
      returning "userId", "username", "createdAt"
      `;
    const params = [username, hashedPassword];
    const result = await db.query(sql, params);
    const [user] = result.rows;
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
  }
});

app.post('/api/auth/sign-in', async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "userId",
           "hashedPassword"
      from "users"
     where "username" = $1
  `;
  const params = [username];
  try {
    const result = await db.query(sql, params);
    const [user] = result.rows;
    if (!user) {
      throw new ClientError(401, 'invalid login');
    }
    const { userId, hashedPassword } = user;
    const isMatching = await argon2.verify(hashedPassword, password);
    if (!isMatching) {
      throw new ClientError(401, 'invalid login');
    }
    const payload = { userId, username };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET);
    res.status(200).json({ token, user: payload });
  } catch (err) {
    console.error(err);
  }
});

app.get('/api/yelp/search/:location', async (req, res, next) => {
  const { location } = req.params;
  if (!location) {
    throw new ClientError(400, 'location is required');
  }
  try {
    const response = await client.search({
      term: 'Bubble Tea',
      location,
      limit: 10
    });
    res.status(200).send(response.jsonBody.businesses);
  } catch (err) {
    next(err);
  }
});

app.get('/api/yelp/:businessId', async (req, res, next) => {
  const { businessId } = req.params;
  try {
    const response = await fetch(`https://api.yelp.com/v3/businesses/${businessId}`, {
      method: 'GET',
      headers: {
        Authorization:
          process.env.YELP_AUTHORIZATION
      }
    });
    const details = await response.json();
    res.status(200).send(details);
  } catch (err) {
    next(err);
  }
});

app.get('/api/reviews/:businessId', async (req, res, next) => {
  const { businessId } = req.params;
  const sql = `
  select *
    from "reviews"
   where "storeId" = $1;
  `;
  const params = [businessId];
  try {
    const result = await db.query(sql, params);
    res.status(200).json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.use(authorizationMiddleware);

app.get('/api/settings', async (req, res, next) => {
  const userId = 1;
  if (!userId) {
    throw new ClientError(401, 'invalid credentials');
  }
  const sql = `
  select "firstName", "lastName", "avatarUrl", "email"
    from "users"
   where "userId" = $1;
  `;
  const params = [userId];
  try {
    const result = await db.query(sql, params);
    res.status(200).json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.post('/api/reviews', uploadsMiddleware, async (req, res, next) => {
  const userId = 1;
  if (!userId) {
    throw new ClientError(401, 'invalid credentials');
  }
  const { businessId, content, drinkType, recommend } = req.body;
  if (!drinkType || !recommend || !content) {
    throw new ClientError(400, 'please fill out the required fields');
  }
  const fileUrl = req.file.location;
  const sql = `
    insert into "reviews" ("userId", "storeId", "imageUrl", "content", "drinkType", "recommend")
    values ($1, $2, $3, $4, $5, $6)
    returning *
    `;
  const params = [userId, businessId, fileUrl, content, drinkType, recommend];
  try {
    const result = await db.query(sql, params);
    const [reviews] = result.rows;
    res.status(201).json(reviews);
  } catch (err) {
    next(err);
  }
});

app.post('/api/settings', uploadsMiddleware, async (req, res, next) => {
  const userId = 1;
  if (!userId) {
    throw new ClientError(401, 'invalid credentials');
  }
  const { firstName, lastName, email } = req.body;
  if (!firstName || !lastName || !email) {
    throw new ClientError(400, 'please fill out the required fields');
  }
  const fileUrl = req.file.location;
  const sql = `
    update "users"
       set "firstName" = $2,
           "lastName" = $3,
           "email" = $4,
           "avatarUrl" = $5
     where "userId" = $1
     returning *
    `;
  const params = [userId, firstName, lastName, email, fileUrl];
  try {
    const result = await db.query(sql, params);
    const [userDetails] = result.rows;
    res.status(201).json(userDetails);
  } catch (err) {
    next(err);
  }
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
