/**
 * http://usejsdoc.org/
 */
const db = require("./database");

function PresenceObject(status, game, memberID, timestamp) {
	this.game = game;
	this.status = status;
	this.memberID = memberID;
	this.timestamp = timestamp;

	this.equals = function equals(u) {
		return u == this.timestamp;
	}
}

exports.PresenceObject = PresenceObject;

exports.update = function(presence, memberID) {
	var q = "INSERT INTO presence (userID,status,game,timestamp) VALUES (?,?,?,?)";
	var v = [ memberID, presence.status, presence.game,
			UNIXToSQLTimeStamp(Date.now()) ];
	db.squery(q, v, function(error, rows, fields) {
	});
}

function UNIXToSQLTimeStamp(timestamp) {
	var d = new Date(timestamp);
	return d.toLocaleDateString() + " " + d.toLocaleTimeString();
}