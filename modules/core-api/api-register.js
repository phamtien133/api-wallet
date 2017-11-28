let dbHelper = require('../../helpers/db-helper');
let crypto = require('crypto');
exports.register = function (method, req, res) {
  switch (method) {
    case 'GET':
      _get(req, res);
      break;
    case 'POST':
      _post(req, res);
      break;
    default:
      _get(req, res);
      break;
  }
};

function _get(req, res) {
}

function _post(req, res) {
  let params = req.body || {};
  let username = params['username'] || '';
  let password = params['password'] || '';
  var ePassword = crypto.createHash('md5').update(password).digest('hex');
  dbHelper.dbLoadSql(
    `INSERT INTO tb_user_info (
    username, 
    password)
    VALUES (?, ?)`,
    [
      username,
      ePassword
    ]
  ).then(
    function (userInfo) {
      if (userInfo.insertId > 0) {
        dbHelper.dbLoadSql(
          `INSERT INTO tb_wallet (
          user_id)
          VALUES (?)`,
          [
            userInfo.insertId
          ]
        ).then(function (wallet) {
          if (wallet.insertId > 0) {
            let data = {
              'status': '1',
              'data': []
            };
            res.send(data);
          }
          else {
            let data = {
              'status': '0',
              'data': []
            };
            res.send(data);
          }
        });
      }
    }
  ).catch(function (error) {
      res.send(error);
    }
  );
}

