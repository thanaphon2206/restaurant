const Response = require('./Response');
const API = require('./API');

const { messageResponse, response, codeStatus } = Response;
const timeFormatter = require('./timeFormatter');

module.exports = {
  Response: response,
  messageResponse,
  Code: codeStatus,
  API,
  timeFormatter,
};
