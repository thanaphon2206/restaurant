const Utils = require('../utils');
const auth = require('../config/passport');
const restaurantRoute = require('./restaurant.route');


module.exports = (app) => {
  // Middleware handing
  app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Restaurant Table Reservation System' });
  });

  app.get('/api/health-check', (req, res) => {
    res.status(200).send();
  });

  // Core APIs
  app.use('/api/restaurants', auth.authenticate.optional, tokenExpired, restaurantRoute);
}

const tokenExpired = (err, req, res, next) => {
  if (err.status === 401) {
    return res.status(200).send(Utils.Response(Utils.Code.InvalidToken))
  }
  next()
}