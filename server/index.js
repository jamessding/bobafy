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
      location
    });
    res.status(200).send(response.jsonBody.businesses);
  } catch (err) {
    console.error(err);
  }
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
