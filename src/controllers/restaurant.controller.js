const Utils = require('../utils');
const Reservation = require('../services/reservation');
const API = require('../utils/API')

// initialize all tables in the restaurant.
exports.initialize = async (req, res) => {
  try {
    const response = await API.placeSearch()
    return res.json(Utils.Response(Utils.Code.Success, response));
  } catch (e) {
    console.log(e)
    return res.json(Utils.Response(Utils.Code.ServiceNotAvailable));
  }
}
