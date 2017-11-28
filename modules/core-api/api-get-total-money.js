let dbHelper = require('../../helpers/db-helper');
let crypto = require('crypto');
exports.getTotalMoney = function (method, req, res) {
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
  let user_id = params['user_id'] || 0;
  dbHelper.dbLoadSql(
    `SELECT total_money 
    FROM tb_wallet w
    WHERE w.user_id = ?`,
    [
      user_id
    ]
  ).then(
    function (userInfo) {
      let data = {
        'status': '1',
        'data': {
          'total_money': userInfo[0]['total_money']
        }
      };

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

