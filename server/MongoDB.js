require('dotenv').config();
var MongoClient = require('mongodb').MongoClient;
var uri = process.env.MONGO_DB_URI;
/*
All retrieved tweets are sent to Mongo for inseration. The ones with _id that already exist won't be inserted again.
*/
exports.insert = function insert(obj, callback) {
	MongoClient.connect(uri, function(err, db) {
		if (!err){
			db.collection(process.env.MONGO_DB_COLLECTION).insertMany(obj, function(error, res) {
				if (!error){
					console.log("Number of documents inserted: " + res.insertedCount);
					db.close();
				}
				callback(error);
			});
		}
		else{
			callback(err);
		}
	});
}

exports.find = function find(callback) {
	MongoClient.connect(uri, function(err, db) {
		if (!err){
			db.collection(process.env.MONGO_DB_COLLECTION).find({}).toArray(function(error, tweets) {
				if (!error){
					console.log("MongoDB found tweets: " + tweets.length);
					db.close();
				}
				callback(error, tweets);
			});
		}
		else{
			callback(err);
		}
	});
	
}