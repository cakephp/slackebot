# slackebot

A Dokku-deployable slack-irc bridge.

# Deploying

On the Dokku server:

```shell
# create the app
dokku apps:create slackebot

# configure the app
dokku config:set CHANNEL_MAPPING="VALUE"
dokku config:set IRC_AUTOSEND_COMMANDS="VALUE"
dokku config:set IRC_BOT_NAME="VALUE"
dokku config:set IRC_FLOOD_PROTECTION="VALUE"
dokku config:set IRC_FLOOD_PROTECTION_DELAY="VALUE"
dokku config:set IRC_SERVER="VALUE"
dokku config:set SLACK_BOT_TOKEN="VALUE"
```

On your local computer:

```shell
# add the remote
git remote add dokku dokku@SERVER_IP:slackebot

# push the app
git push dokku master
```
