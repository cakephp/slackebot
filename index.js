var slackIRC = require('slack-irc').default;

var autoSendCommands = [];
var floodProtection = process.env.IRC_FLOOD_PROTECTION;
var channelMapping = {};

if (floodProtection === 'false') {
  floodProtection = false;
} else {
  floodProtection = true;
}

var temp = process.env.IRC_AUTOSEND_COMMANDS;
temp = temp.split(',');
for (var i = 0, len = temp.length; i < len; i++) {
  autoSendCommands.push(temp[i].split(':'));
}

var temp = process.env.CHANNEL_MAPPING;
temp = temp.split(',');
for (var i = 0, len = temp.length; i < len; i++) {
  var map = temp[i].split(':');
  channelMapping[map[0]] = map[1];
}

slackIRC([
  {
    "nickname": process.env.IRC_BOT_NAME,
    "server": process.env.IRC_SERVER,
    "token": process.env.SLACK_BOT_TOKEN, // Your bot user's token
    "autoSendCommands": autoSendCommands, // Commands that will be sent on connect,
    "channelMapping": channelMapping, // Maps each Slack-channel to an IRC-channel, used to direct messages to the correct place,
    "ircOptions": { // Optional node-irc options
      "floodProtection": floodProtection, // On by default
      "floodProtectionDelay": process.env.IRC_FLOOD_PROTECTION_DELAY // 500 by default
    },
    // Makes the bot hide the username prefix for messages that start
    // with one of these characters (commands):
    "commandCharacters": ["!", "~"],
    // Prevent messages posted by Slackbot (e.g. Slackbot responses)
    // from being posted into the IRC channel:
    "muteSlackbot": true, // Off by default
    // Sends messages to Slack whenever a user joins/leaves an IRC channel:
    "ircStatusNotices": {
      "join": false, // Don't send messages about joins
      "leave": false
    }
  }
]);
