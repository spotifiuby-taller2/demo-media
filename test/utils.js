const sinon = require("sinon");

const mockResponse = () => {
  const res = {};
  res.status = sinon.fake.returns(res);
  res.json = sinon.fake.returns(res);
  return res;
}

module.exports = {
  mockResponse,
}
