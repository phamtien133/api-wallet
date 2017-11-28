var express = require('express');
var apiRegister = require('../modules/core-api/api-register');
var apiLogin = require('../modules/core-api/api-login');
var coreApiRoute = express.Router();

coreApiRoute.get('/regitser', function(req, res) {
  let data = {
    'status': '0',
    'error': "Method get isn't accept",
    'data': []
  };
  res.send(data);
});
coreApiRoute.post('/regitser', function(req, res) {
  apiRegister.register('POST', req, res);
});

coreApiRoute.get('/login', function(req, res) {
  let data = {
    'status': '0',
    'error': "Method get isn't accept",
    'data': []
  };
  res.send(data);
});

coreApiRoute.post('/login', function(req, res) {
  apiLogin.login('POST', req, res);
});

module.exports = coreApiRoute;
