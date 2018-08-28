const mysql = require('mysql');

// 读取本地配置
const config = require('./config/db_config.json');

const pool = mysql.createPool(config);

// values可以写成{param： "this param"}
// 具体参见https://github.com/mysqljs/mysql#preparing-queries
let query = function (sql, values) {
	return new Promise((resolve, reject) => {
		pool.getConnection(function (err, connection) {
			if (err) {
				reject(err);
			} else {
				connection.query(sql, values, (err, rows) => {
					if (err) {
						reject(err);
					} else {
						resolve(rows);
					}
					
					connection.release();
				});
			}
			
		});
	});
}

module.exports = { query }