const Twitter = require("twitter");
const fs = require("fs");
const headers = require("./config.js");

const client = new Twitter({
  consumer_key: headers.consumer_key,
  consumer_secret: headers.consumer_secret,
  access_token_key: headers.access_token_key,
  access_token_secret: headers.access_token_secret,
});

const params = { screen_name: "nodejs", tweet_mode: "extended", count: 200 };

client.get("statuses/home_timeline.json", params, function (
  error,
  tweets,
  response
) {
  if (!error) {
    fs.writeFile("all_twitter.json", JSON.stringify(tweets), function (err) {
      if (err) return console.log(err);
      console.log("JSON File written");
    });
  }
});
