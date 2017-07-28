var SteamCommunity = require('steamcommunity');
var steam = new SteamCommunity();
var SteamTotp = require('steam-totp');

var logOnOptions = {
  'accountName': "csgojambot",
  'password': "dota&csgo4life",
  'twoFactorCode':SteamTotp.generateAuthCode("13j01taqf7tBpsN0qm8085RRDbI=")
};

//logs in via browser
steam.login(logOnOptions, function(err, sessionID, cookies, steamguard) {
    if (err) {
        console.log("There was an error logging in! Error details: " + err.message);
        process.exit(1); //terminates program
    } else {
        console.log("Successfully logged in as " + logOnOptions.accountName);
        steam.chatLogon();
    }
});