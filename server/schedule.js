// server chay xoa tin nhan hang ngay

var schedule = require('node-schedule');
MongoClient = require('mongodb').MongoClient;
util = require('./util');
timeout = 86400000;

var rule = new schedule.RecurrenceRule();

// Vao 12 phut moi gio kiem tra tin nhan cu va xoa
rule.minute = 2;

var j = schedule.scheduleJob(rule, function(){

	// xoa tin nhan public quan 1 ngay
	MongoClient.connect("mongodb://localhost:27017/local", function(err, db) {
	  var collection = db.collection('message');
	  collection.find().toArray(function (err, item) {
	    var sizeofMessage = item.length;
	    for (var i = 0; i < sizeofMessage; i++) {
	    	var currentTime = new Date(util.get_time());
	    	var timeSend = new Date(item[i].date_send);
	    	if (Math.abs(currentTime - timeSend) >= timeout) {
	    		collection.remove({ date_send: item[i].date_send },function(err, results) {
					if (err) {
						console.log('delete message error');
					} else {
						console.log('delete message success');
					}
				})
	    	}
	    }
	  })

	});

	// xoa tin nhan private qua 1 ngay
	MongoClient.connect("mongodb://localhost:27017/local", function(err, db) {
	  var collection = db.collection('message_private');
	  collection.find().toArray(function (err, item) {
	    var sizeofMessage = item.length;
	    for (var i = 0; i < sizeofMessage; i++) {
	    	var currentTime = new Date(util.get_time());
	    	var timeSend = new Date(item[i].date);
	    	if (Math.abs(currentTime - timeSend) >= timeout) {
	    		collection.remove({ date: item[i].date },function(err, results) {
					if (err) {
						console.log('delete message error');
					} else {
						console.log('delete message success');
					}
				})
	    	}
	    }
	  })

	});



});