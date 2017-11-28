var express = require('express');
var apiRegister = require('../modules/core-api/api-register');
var apiLogin = require('../modules/core-api/api-login');
var apiGetTotalMoney = require('../modules/core-api/api-get-total-money');
var coreApiRoute = express.Router();

coreApiRoute.get('/register', function(req, res) {
  let data = {
    'status': '0',
    'error': "Method get isn't accept",
    'data': []
  };
  res.send(data);
});
coreApiRoute.post('/register', function(req, res) {
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

coreApiRoute.post('/get-total-money', function(req, res) {
  apiGetTotalMoney.getTotalMoney('POST', req, res);
});
module.exports = coreApiRoute;
