var request = require("request");
const headers = require("./config.js");
var options = {
  method: "GET",
  url: "https://api.twitter.com/1.1/statuses/home_timeline.json?count=200",
  headers: {
    Authorization: headers.oauth,
    Cookie: headers.personal,
  },
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
