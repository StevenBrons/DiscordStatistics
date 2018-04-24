const db = require("./database");
var list;
var client;

function GuildObject(obj) {
	this.id = obj.id + "";
	this.ownerID = obj.ownerID + "";
	this.name = obj.name;
	this.memberCount = obj.memberCount;

	this.created = obj.created == null ? UNIXToSQLTimeStamp(obj.createdTimestamp)
			: obj.created;
	this.region = obj.region;
	this.splash = obj.splash;
	this.iconURL = obj.iconURL;
	this.timestamp = obj.timestamp;

	this.equals = function equals(g) {
		return (this.id == g.id && this.name == g.name
				&& this.memberCount == g.memberCount && this.splash == g.splash && this.iconURL == g.iconURL);
	}
}
exports.GuildObject = GuildObject;

exports.init = function(c) {
	client = c;
	list = [];
	var q = "SELECT max(timestamp) AS timestamp,id,ownerID,name,memberCount,created,region,splash,iconURL FROM guilds GROUP BY id;";
	db.squery(q, function(error, rows, fields) {
		if (!error) {
			for (var i = 0; i < rows.length; i++) {
				list[i] = new GuildObject(rows[i]);
			}
		}
	});
}

exports.getLocalGuild = function(guild) {
	for (var i = 0; i < list.length; i++) {
		if (guild.id == list[i].id) {
			return list[i];
		}
	}
	return new GuildObject({});
}

exports.update = function(guild) {
	var g = new GuildObject(guild);
	var old = exports.getLocalGuild(g);
	if (!old.equals(g)) {
		updateGuild(g);
	}
}

function updateGuild(g) {
	var q = "INSERT INTO guilds (id,ownerID,name,memberCount,created,region,splash,iconURL,timestamp) VALUES (?,?,?,?,?,?,?,?,?)";
	var v = [ g.id, g.ownerID, g.name, g.memberCount, g.created, g.region,
			g.splash, g.iconURL, UNIXToSQLTimeStamp(Date.now()) ];

	db.squery(q, v, function(error, rows, fields) {
		if (client.guilds.length > list.length) {
			exports.init(client);
		} else {
			for (var i = 0; i < list.length; i++) {
				if (list[i].id == g.id) {
					list[i] = g;
				}
			}
		}
	});
}

function UNIXToSQLTimeStamp(timestamp) {
	var d = new Date(timestamp);
	return d.toLocaleDateString() + " " + d.toLocaleTimeString();
}
