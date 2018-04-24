const Discord = require('discord.js');
const client = new Discord.Client();
const db = require("./database");
var express = require('express');
var http = require('http');
var path = require('path');

const guild = require("./Guild");
const user = require("./User");
const presence = require("./Presence");

guild.init(client);
user.init(client);

client.on('ready', function() {
	setTimeout(function() {
		for (var i = 0; i < client.guilds.keyArray().length; i++) {
			var g = client.guilds.get(client.guilds.keyArray()[i]);
			guild.update(g);
			for (var j = 0; j < g.members.keyArray().length; j++) {
				var u = g.members.get(g.members.keyArray()[j]);
				user.update(u);
			}
		}

	}, 100)
	console.log('I am ready!');
});


client.on("presenceUpdate", function(message) {
	presence.update(message.guild.presences.get(message.user.id),
			message.user.id);
});

client.on("guildUpdate", function(message) {
	guild.update(client.guilds.get(message.id));
});

client.on("guildMemberUpdate", function(message) {
	user.update(client.guilds.get(message.guild.id).members.get(message.id));
});

client.login("MzgzMjc3MjkyMTk5MjE1MTA2.DPh6vA.10tWXVA8kMXzouceva-rBD2uMew");


var app = express();

// all environments
app.set('port', process.env.PORT || 26194);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
app.use(express.errorHandler());
}

app.get('/', function(req, res){
	res.render('index',{});65
});

app.get('/stats', function(req, res){
	res.render('stats',{server:{name:"Unity"}});
});

http.createServer(app).listen(app.get('port'), function(){
console.log('Express server listening on port ' + app.get('port'));
});
