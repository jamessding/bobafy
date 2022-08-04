const fetch = require('node-fetch');
require('dotenv/config');
const path = require('path');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const ClientError = require('./client-error');
const app = express();
const publicPath = path.join(__dirname, 'public');
const yelp = require('yelp-fusion');
const client = yelp.client(process.env.YELP_NPM_AUTHORIZATION);
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
  if (!businessId) {
    throw new ClientError(400, 'businessId is required');
  }
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

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
