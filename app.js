var express = require("express");
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());
require('dotenv').config();

var Twitter = require('./server/Twitter.js');
var MongoDB = require('./server/MongoDB.js');
	
app.get('/api/tweetsSet', function (req, res) {
	MongoDB.find(function(err, tweets){
		if(!err){
			res.writeHead(200, { 'Content-Type': 'application/json' });
			console.log("Found tweets: " + tweets.length);
			res.end(JSON.stringify(tweets, null, 2));
		} else {
			res.writeHead(400, { 'Content-Type': 'application/json' });
			console.log("NO tweets: ");
			res.end();	
		}
	});
});

app.post('/api/tweetsSet', function (req, res) {
	var msg = req.body && req.body.event ? req.body.event.text : null;
	if(msg == null){
		res.writeHead(400, { 'Content-Type': 'text/plain' });
		res.end();
		return;
	}
	
	var regex = new RegExp(process.env.REGEX, process.env.REGEX_MODIFIER);
	var foundGo = regex.test(msg);
	if(foundGo){
		Twitter.getTweets(function(error, tweets){
			tweets = normalizeTweets(tweets);
			if (!error) {
				MongoDB.insert(tweets, function(err){
					if(err)
						console.log("Error in MongoDB: " + err);
				});
			}
			else{
				console.log("ERROR in retrieving tweets: " + error);
			}
		});
	}
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end(req.body.challenge);
});

var normalizeTweets = function normalizeTweets(tweets){
	var normalizedTweets = [];
	for(var i = 0; i < tweets.length; i++){
		normalizedTweets.push({"_id": tweets[i].id_str,
		"text": tweets[i].text});
	}
	return normalizedTweets;
}
var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
	var host = server.address().address;
	port = server.address().port;
    console.log("Zappy is listening on port: " + port);
});
app.get('*', function(req, res) {
	res.sendFile(__dirname+'/views/index.html');
});
module.exports = server;