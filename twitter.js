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

let obj = []; // formatted data

client.get("statuses/home_timeline.json", params, function (
  error,
  tweets,
  response
) {
  if (!error) {
    let data = JSON.parse(response.body);

    // Just get the data you care about
    for (let i = 0; i < data.length; i++) {
      obj[i] = [];
      obj[i].push(data[i].created_at);
      obj[i].push((user = data[i].user.name));
      obj[i].push((text = data[i].full_text));
    }

    console.log(obj);

    fs.writeFile("formatted_data.json", JSON.stringify(obj), function (err) {
      if (err) return console.log(err);
      console.log("JSON File written");
    });

    // fs.writeFile("all_data.json", JSON.stringify(tweets), function (err) {
    //   if (err) return console.log(err);
    //   console.log("JSON File written");
    // });
  }
});
