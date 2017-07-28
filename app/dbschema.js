var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:dota&csgo4life@ds063630.mlab.com:63630/csgojam');

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
		totalLost : String,
		imageURL : String
	},{collection:'users'});

	var users = mongoose.model('users',usersSchema);






	var flipDetailsSchema = new mongoose.Schema({
		hash : String,
		investor1 : String,
		investor2 : String,
		perPersonInvestment : String,
		winner : String
	},{collection:'flipDetails'});

	var flipDetails = mongoose.model('flipDetails',flipDetailsSchema);





	var botDetailsSchema = new mongoose.Schema({

	},{collection:'botDetails'});

	var botDetails = mongoose.model('botDetails',botDetailsSchema);





	var creditsTransactionSchema = new mongoose.Schema({

	},{collection:'creditsTransaction'});

	var creditsTransaction = mongoose.model('creditsTransaction',creditsTransactionSchema);






	var referralsSchema = new mongoose.Schema({

	},{collection:'referrals'});

	var referrals = mongoose.model('referrals',referralsSchema);





	var userLogsSchema = new mongoose.Schema({

	},{collection:'userLogs'});

	var userLogs = mongoose.model('userLogs',userLogsSchema);






	var userTypesSchema = new mongoose.Schema({

	},{collection:'userTypes'});

	var userTypes = mongoose.model('userTypes',userTypesSchema);

	exports.usersModel = users;
	exports.flipDetailsModel = flipDetails;
	exports.botDetailsModel = botDetails;
	exports.creditsTransactionModel = creditsTransaction;
	exports.referralsModel = referrals;
	exports.userLogsModel = userLogs;
	exports.userTypesModel = userTypes;