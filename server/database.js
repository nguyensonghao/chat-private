
MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://localhost:27017/local", function(err, db) {
  var collection = db.collection('message');
  collection.find().limit(10).skip(10).toArray(function (err, item) {
    console.log(item);
  })
})