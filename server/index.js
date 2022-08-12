const fetch = require('node-fetch');
require('dotenv/config');
const path = require('path');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const ClientError = require('./client-error');
const uploadsMiddleware = require('./uploads-middleware');
const pg = require('pg');
const app = express();
const publicPath = path.join(__dirname, 'public');
const yelp = require('yelp-fusion');
const client = yelp.client(process.env.YELP_NPM_AUTHORIZATION);

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

app.get('/api/settings', async (req, res, next) => {
  // const { userId } = req.user; --change when sign in implemented AppContext
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
  // const { userId } = req.user; --change when sign in implemented AppContext
  const userId = 1;
  if (!userId) {
    throw new ClientError(401, 'invalid credentials');
  }
  const { businessId, content, drinkType, recommend } = req.body;
  if (!drinkType || !recommend || !content) {
    throw new ClientError(400, 'please fill out the required fields');
  }
  const fileUrl = req.file.location; // The S3 url to access the uploaded file later
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

// for submitting changes in settings
// app.post('/api/settings', uploadsMiddleware, async (req, res, next) => {
//   // const { userId } = req.user; --change when sign in implemented AppContext
//   const userId = 1;
//   if (!userId) {
//     throw new ClientError(401, 'invalid credentials');
//   }
//   const { businessId, content, drinkType, recommend } = req.body;
//   if (!drinkType || !recommend || !content) {
//     throw new ClientError(400, 'please fill out the required fields');
//   }
//   const fileUrl = req.file.location; // The S3 url to access the uploaded file later
//   const sql = `
//     insert into "reviews" ("userId", "storeId", "imageUrl", "content", "drinkType", "recommend")
//     values ($1, $2, $3, $4, $5, $6)
//     returning *
//     `;
//   const params = [userId, businessId, fileUrl, content, drinkType, recommend];
//   try {
//     const result = await db.query(sql, params);
//     const [reviews] = result.rows;
//     res.status(201).json(reviews);
//   } catch (err) {
//     next(err);
//   }
// });

app.get('/api/images', (req, res, next) => {
  const sql = `
    select *
      from "images"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
