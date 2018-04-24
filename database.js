/**
 * http://usejsdoc.org/
 */

var mysql = require('mysql');

var connection = mysql.createConnection({
	host : 'localhost',
	user : 'discord',
	password : '1m1HbUeKsIAdyguC',
	database : 'discordbot',
	port : 3306
});

exports.connection = connection;

connection.connect(function(error) {
	if (!!error) {
		console.log(error);
		console.log("[MySQL error]:");
	} else {
		console.log("MySQL connection established!");
	}
});

function query(query, callback, data) {
	connection.query(query, function(error, rows, fields) {
		if (error != null) {
			console.log(query);
			console.log(error);
		} else {
			if (typeof callback == "function") {
				callback(error, rows, fields, data);
			}
		}
	});
};

function esc(input) {
	return mysql.escape(input);
}

exports.mysql = mysql;
exports.query = query;
exports.escape = esc;

exports.squery = function squery(query, values, callback, data) {
	connection.query(query, values, function(error, rows, fields) {
		if (error != null) {
			console.log(query);
			console.log(error);
		} else {
			if (typeof callback == "function") {
				callback(error, rows, fields, data);
			}
		}
	});
}
