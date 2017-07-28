var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:dota&csgo4life@ds063630.mlab.com:63630/csgojam');

var express = require('express'),
    steam   = require('steam-login');
var dbcollections = require('./dbschema');
var app = express();
app.set('views', __dirname);
app.set('view engine', 'ejs');
app.use(require('express-session')({ resave: false, saveUninitialized: false, secret: 'a secret' }));
app.use(steam.middleware({
    realm: 'http://localhost:3000/',
    verify: 'http://localhost:3000/verify',
    apiKey: '636CA6AADAA5A2B240255A147D7E116A'}
));

app.get('/', function(req, res) {
	res.redirect('/login');
	
    //console.log(dbcollections.usersSchema);
    //res.send(req.user).end();
});

app.get('/login',function(req, res){
	res.render('login');
});

app.get('/authenticate', steam.authenticate(), function(req, res) {
    res.redirect('/');
});

app.get('/verify', steam.verify(), function(req, res) {
    
    
	var users = dbcollections.usersModel;
	//console.log(req.user.steamid);
	users.find({steamAttr:req.user.steamid},function(err,data){
		console.log(data);
		if(data=="[]") 
		{
			console.log("nulllllll");
			var u = new dbcollections.usersModel({
			"steamAttr": ""+req.user.steamid,
		    "points": "1000",
		    "referrer": "String",
		    "type": "String",
		    "is_active": 1,
		    "totalWithdrawal": "String",
		    "totalDeposit": "String",
		    "totalWon": "String",
		    "totalLost": "String",
		    lastLogin : new Date(),
		    imageURL : ""+req.user.avatar.large	});

		    u.save();
		}
	});
	/*if(""+users.find({steamAttr:req.user.steamid},function(err,data){
		if(err) console.log(err);
	})=="[]"){
		var users = new dbcollections.usersModel({
		"steamAttr": ""+req.user.steamid,
	    "points": "1000",
	    "referrer": "String",
	    "type": "String",
	    "is_active": 1,
	    "totalWithdrawal": "String",
	    "totalDeposit": "String",
	    "totalWon": "String",
	    "totalLost": "String",
	    lastLogin : new Date(),
	    imageURL : ""+req.user.avatar.large	});

	    users.save();
	
	}*/

	/*users.update({
	"steamAttr": ""+req.user.steamid,
    "points": "1000",
    "referrer": "String",
    "type": "String",
    "is_active": 1,
    "totalWithdrawal": "String",
    "totalDeposit": "String",
    "totalWon": "String",
    "totalLost": "String",
    lastLogin : new Date(),
    imageURL : ""+req.user.avatar.large

	},{
	"steamAttr": ""+req.user.steamid,
    "points": "1000",
    "referrer": "String",
    "type": "String",
    "is_active": 1,
    "totalWithdrawal": "String",
    "totalDeposit": "String",
    "totalWon": "String",
    "totalLost": "String",
    lastLogin : new Date(),
    imageURL : ""+req.user.avatar.large

	},{upsert:true},function(req, res){});
	*/// users.save();
	res.redirect('/');
    //res.send(req.user).end();
});

app.get('/logout', steam.enforceLogin('/'), function(req, res) {
    req.logout();
    res.redirect('/');
});

app.listen(3000);
console.log('listening');