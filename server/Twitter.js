require('dotenv').config();
var Twitter = require('twitter');

exports.getTweets = function getTweets(callback) {
    var twitter = new Twitter({
		consumer_key: process.env.TWITTER_CONUMER_KEY,
		consumer_secret: process.env.TWITTER_CONUMER_SECRET,
		access_token_key: process.env.TWITTER_ACCESS_TOKEN,
		access_token_secret: process.env.TWITTER_ACCESS_SECRET
	});
	twitter.get('statuses/user_timeline',{ screen_name: 'FictionFone'}, function(error, tweets, response) {
		callback(error, tweets);
	});
}