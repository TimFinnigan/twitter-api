const request = require("request");
const fs = require("fs");
const headers = require("./config.js");

const options = {
  method: "GET",
  url: "https://api.twitter.com/1.1/statuses/home_timeline.json?count=200",
  headers: {
    Authorization: headers.oauth,
    Cookie: headers.personal,
  },
};

request(options, function (error, response) {
  if (error) throw new Error(error);

  fs.writeFile("twitter.json", response.body, function (err) {
    if (err) return console.log(err);
    console.log("JSON File written");
  });
});
