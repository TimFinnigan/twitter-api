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

let obj = {}; // formatted data

request(options, function (error, response) {
  if (error) throw new Error(error);

  let data = JSON.parse(response.body);

  // Just get the data you care about
  for (let i = 0; i < data.length; i++) {
    obj[i] = {};
    obj[i].date = data[i].created_at;
    obj[i].user = data[i].user.name;
    obj[i].text = data[i].text;
  }

  console.log(obj);

  fs.writeFile("formatted_data.json", JSON.stringify(obj), function (err) {
    if (err) return console.log(err);
    console.log("JSON File written");
  });

  //   fs.writeFile("all_twitter_data.json", response.body, function (err) {
  //     if (err) return console.log(err);
  //     console.log("JSON File written");
  //   });
});
