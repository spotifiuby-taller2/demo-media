const constants = require('../others/constants');
const fetch = require('node-fetch');

function setBodyResponse(responseBody, status, res) {
  res.status(status).json(responseBody);
}

function setErrorResponse(error, status, res) {
  const responseBody = {
    error: error.toString()
  }

  setBodyResponse(responseBody, status, res);
}

const newError = (status, message) => {
  return {status: status, body: {error: message}};
}

function getDate() {
  return new Date().toISOString()
    .substr(0, 10);
}

function areAnyUndefined(list) {
  return list.filter((element) => {
    return element === undefined || element.length === 0
  }).length > 0;
}

const postToGateway = (body) => {
  body.verbRedirect = "POST";
  body.apiKey = constants.MY_API_KEY;

  return fetch(constants.SERVICES_HOST + constants.REDIRECT_URL, {
        method: "POST",
        headers: constants.JSON_HEADER,
        body: JSON.stringify(body)
      }
  ).then(response =>
      response.json()
  ).catch(error => ({
    error: error.toString()
  }));
}

module.exports = {
  setErrorResponse,
  setBodyResponse,
  getDate,
  areAnyUndefined,
  newError,
  postToGateway
}
