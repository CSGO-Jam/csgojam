var mongoose = require('mongoose');
var express = require('express');
//var mongo = require('mongodb');
mongoose.connect('mongodb://admin:dota&csgo4life@ds063630.mlab.com:63630/csgojam');
//var db = mongo.collection('users');


var usersSchema = new mongoose.Schema({
	steamAttr : String,
	points : String,
	referrer : String,
	type : String,
	is_active : Number,
	lastLogin : Date,
	totalWithdrawal : String,
	totalDeposit : String,
	totalWon : String,
	totalLost : String
},{collection:'users'});

var users = mongoose.model('users',usersSchema);

/*var u = new users({
	steamAttr : 'String',
	points : 'String',
	referrer : 'String',
	type : 'String',
	is_active : 1,
	lastLogin : new Date(),
	totalWithdrawal : 'String',
	totalDeposit : 'String',
	totalWon : 'String',
	totalLost : 'String'
});

u.save();
*/
/*users.findById('5976f7d86a226715a0f75d05',function (err, data){
	

	console.log(data);
	data.points = 'New points String';
	data.save();
//	console.log(data);
	if(!!err)	
		console.log("err: "+err);
});
*/
users.find({points:'New points String'},function(err,data){
	console.log("points:");
	console.log(data);
	if(err) console.log('err1: '+err);
	users.remove({points:'New points String'},function(err){
	console.log("points:");
	if(err) console.log('err2: '+err);
});
});



