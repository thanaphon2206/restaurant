const codeStatus = {
  Success: 0,
  MaintenanceService: 500,
  ExistData: 900,
  InvalidData: 901,
  WrongUsername: 902,
  InvalidPassword: 903,
  InvalidUsernameOrToken: 904,
  InvalidRequestData: 997,
  ServiceNotAvailable: 999,
  InvalidToken: 1002,
  CreateRest: 1003,
};

const status = (code) => {
  let res;
  switch (code) {
    case 0:
      res = { code, message: 'Success' };
      break;
    case 500:
      res = { code, message: 'Maintenance Service' };
      break;
    case 901:
      res = { code, message: 'Invalid Data' };
      break;
    case 997:
      res = { code, message: 'Invalid Request Data' };
      break;
    case 999:
      res = { code, message: 'ระบบไม่สามารถดำเนินการได้ในขณะนี้ ลองใหม่อีกครั้ง' };
      break;
    case 1003:
      res = { code, message: 'Please create restaurant' };
      break;
    case 1100:
      res = { code, message: 'An username is required to generate a token' };
      break;
    case 601:
      res = { code, message: 'Invalid Username or Password' };
      break;
    default: break;
  }
  return res;
};

const messageResponse = (data, error) => ({
  data,
  error,
});

const response = (code, data = {}) => ({
  status: status(code),
  data,
});

module.exports = {
  response,
  codeStatus,
  messageResponse,
};
