let dbHelper = require('../../helpers/db-helper');
let crypto = require('crypto');
exports.login = function (method, req, res) {
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
    `SELECT id 
    FROM tb_user_info ui
    WHERE ui.username = ?
    AND ui.password = ?`,
    [
      username,
      ePassword
    ]
  ).then(
    function (userInfo) {
      let data = [];
      if (userInfo[0]['id'] > 0) {
        data = {
          'status': '1',
          'data': []
        };
      } else {
        data = {
          'status': '0',
          'data': []
        };
      }

      res.send(data);
    }
  ).catch(function (error) {
      let data = {
        'status': '0',
        'data': []
      };
      res.send(data);
    }
  );
}

