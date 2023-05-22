const expressValidation = require('express-validation');
const Utils = require('../utils');
const { env } = require('../config/vars');

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
const handler = (err, req, res) => { // eslint-disable-line
  const response = {
    status: err.status,
    stack: err.stack,
  };
  if (env !== 'development') {
    delete response.stack;
  }
  
  res.json(response);
};

exports.handler = handler;

/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */
exports.converter = (err, req, res) => { // eslint-disable-line
  let convertedError = err;

  if (err instanceof expressValidation.ValidationError) {
    convertedError = Utils.Response(Utils.Code.InvalidRequestData);
  }
  return handler(convertedError, req, res);
};

/**
 * Catch 404 and forward to error handler
 * @public
 */
exports.notFound = (req, res) => { // eslint-disable-line
  return handler(Utils.Response(Utils.Code.HostNotFound), req, res);
};
