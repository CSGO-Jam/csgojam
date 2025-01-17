var SteamCommunity = require('steamcommunity');
var steam = new SteamCommunity();
var TradeOfferManager = require('steam-tradeoffer-manager');
var SteamTotp = require('steam-totp');

var manager = new TradeOfferManager({
  "domain": "charredgrass.github.io", //for api key uses
  "language": "en",
  "pollInterval": 30000
});

var logOnOptions = {
    'accountName': "csgojambot",
    'password': "dota&csgo4life",
    'twoFactorCode': SteamTotp.generateAuthCode("13j01taqf7tBpsN0qm8085RRDbI=") //this line and the comma before it can be removed if you don't have mobile auth enabled, but I'm assuming you do if you plan to trade
};

var identitySecret = "e7cFR4vOqn/xe0GxivfCj7o3+P4=";

//logs in via browser
steam.login(logOnOptions, function(err, sessionID, cookies, steamguard) {
    if (err) {
        console.log("There was an error logging in! Error details: " + err.message);
        process.exit(1); //terminates program
    } else {
        console.log("Successfully logged in as " + logOnOptions.accountName);
        steam.chatLogon();
        manager.setCookies(cookies, function(err) {
            if (err) {
                console.log(err);
                process.exit(1);
            }
        });
    }
    steam.startConfirmationChecker(10000, identitySecret); //Auto-confirmation enabled!
});

manager.on('newOffer', processTrade);

function processTrade(offer) {
    console.log("New trade from " + offer.partner);
    

    offer.accept(function(err) {
        if (err) {
            console.log("Error accepting offer: " + err.message);
        } else {
            console.log("Successfully accepted an offer.");
        }
    });
}