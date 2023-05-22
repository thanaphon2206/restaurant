const expressJwt = require('express-jwt');
const { jwt } = require('./vars');

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;
  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1];
  }
  return null;
};

const authenticate = {
  required: expressJwt({
    secret: jwt.secret,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    algorithms: ['HS256'],
  }),
  optional: expressJwt({
    secret: jwt.secret,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    algorithms: ['HS256'],
    credentialsRequired: false,
  }),
};

module.exports = {
  authenticate,
};
