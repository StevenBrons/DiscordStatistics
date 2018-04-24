/**
 * http://usejsdoc.org/
 */

const db = require("./database");
var client;

function UserObject(obj) {
	this.id = obj.id + "";
	this.serverID = (obj.serverID == null ? obj.guild.id : obj.serverID) + "";
	this.username = obj.username == null ? obj.user.username : obj.username;
	this.discriminator = obj.discriminator == null ? obj.user.discriminator
			: obj.discriminator;
	this.avatar = obj.avatar == null ? obj.user.displayAvatarURL : obj.avatar;
	this.displayname = obj.displayName;
	this.joined = obj.joined == null ? UNIXToSQLTimeStamp(obj.joinedTimesamp)
			: obj.joined;
	this.color = obj.color == null ? obj.displayHexColor : obj.color;
	this.bot = obj.bot == null ? obj.user.bot == true ? 1 : 0 : obj.bot;

	this.equals = function equals(u) {
		return (this.id == u.id && this.username == u.username
				&& this.discriminator == u.discriminator
				&& this.avatar == u.avatar && this.displayname == u.displayname
				&& this.joined == u.joined && this.color == u.color && this.bot == u.bot);
	}
}
exports.UserObject = UserObject;

exports.init = function(client) {
}

exports.update = function(user) {
	var u = new UserObject(user);
	var q = "SELECT COUNT(*) AS count  FROM discordbot.users a INNER JOIN (SELECT id,MAX(timestamp) AS time FROM discordbot.users GROUP BY id) b ON a.id = b.id AND a.timestamp = b.time WHERE a.id = ? AND a.avatar = ? AND a.displayname = ? AND a.color = ?;";
	var v = [ u.id, u.avatar, u.displayname, u.color ];
	db.squery(q, v, function(error, rows, fields) {
		if (rows[0].count == 0) {
			updateUser(u)
		} else {
		}

	});
}

function updateUser(u) {
	var q = "INSERT INTO users (id,serverID,username,discriminator,avatar,displayname,joined,color,bot,timestamp) VALUES (?,?,?,?,?,?,?,?,?,?)";
	var v = [ u.id, u.serverID, u.username, u.discriminator, u.avatar,
			u.displayname, u.joined, u.color, u.bot,
			UNIXToSQLTimeStamp(Date.now()) ];
	db.squery(q, v, function(error, rows, fields) {
	});
}

function UNIXToSQLTimeStamp(timestamp) {
	var d = new Date(timestamp);
	return d.toLocaleDateString() + " " + d.toLocaleTimeString();
}
