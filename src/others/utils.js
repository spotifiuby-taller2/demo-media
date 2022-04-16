function setBodyResponse(responseBody, status, res) {
  res.status(status).json(responseBody);
}

function setErrorResponse(error, status, res) {
  const responseBody = {
    error: error.toString()
  }

  setBodyResponse(responseBody, status, res);
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

module.exports = {
  setErrorResponse,
  setBodyResponse,
  getDate,
  areAnyUndefined,
}
