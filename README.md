# Summary

Zappy is a web tool that integrates with a Slack channel and listens on specific messages.
As soon as any member of the marketing team, places a messages on a channel containing a certain message, e.g. “go”, the tool fetches twitter feeds from the Twitter account specified, e.g. FictionFone account and saves in a mongo collection.

#.env
.env contains environment variables described here

 * SLACK_TOKEN=<SLACK-API-TOKEN> - After creating an application with Slack APIs, copy the Token here.
 * PORT=4000 - The port number for Zappy to start on
 * TWITTER_CONUMER_KEY=<YOUR_TWITTER_CONUMER_KEY>
 * TWITTER_CONUMER_SECRET=<YOUR_TWITTER_CONUMER_SECRET>
 * TWITTER_ACCESS_TOKEN=<YOUR_TWITTER_ACCESS_TOKEN>
 * TWITTER_ACCESS_SECRET=<YOUR_TWITTER_ACCESS_TOKEN>
 * TWITTER_SCREEN_NAME=<YOUR_SCREEN_NAME> - The twitter account to fetch tweets from screen name.
 * MONGO_DB_URI=<YOUR_MONGO_DB_URI>
 * MONGO_DB_COLLECTION=<YOUR_MONGO_DB_COLLECTION>
 * REGEX=\bgo\b - The message that once placed on Slack channel, triggers fetching from the tweets from twitter. For simplicity we use go.

# Included tools:
    * NodeJS express framework for developing the API and server side logic.
	* Chai and Mocha used for unit tests for Node.
	* The frontend application displays the fetched tweets using Angular 4.

# Built and Deployed Zappy Instance on IBM Cloud
**URL**: [Zappy Web App on IBM Cloud](https://zappywebapp.eu-gb.mybluemix.net/)
