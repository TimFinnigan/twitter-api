const Twitter = require('twitter');
const fs = require('fs');
const headers = require('./config.js');

const client = new Twitter({
	consumer_key: headers.consumer_key,
	consumer_secret: headers.consumer_secret,
	access_token_key: headers.access_token_key,
	access_token_secret: headers.access_token_secret,
});

const params = { screen_name: 'nodejs', tweet_mode: 'extended', count: 200 };

const getLocalDate = function (utc) {
	let d = new Date(utc + ' UTC');
	return d.toLocaleString('en-US', {
		dateStye: 'short',
	});
};

const formatText = function (text) {
	if (text.includes('https')) {
		return '<span linkify>' + text + '</span>';
	}
	return text;
};

let allData = [];

client.get('statuses/home_timeline.json', params, function (
	error,
	tweets,
	response
) {
	if (!error) {
		let data = JSON.parse(response.body);
		console.log(tweets);

		// Just get the data you care about
		for (let i = 0; i < data.length; i++) {
			let localDate = getLocalDate(data[i].created_at);
			localDate = localDate.split(',');
			let obj = {};
			obj.timestamp = new Date(data[i].created_at);
			obj.day = localDate[0];
			obj.time = localDate[1];
			obj.user = data[i].user.name;
			obj.text = formatText(data[i].full_text);
			obj.retweets = data[i].retweet_count;
			obj.favorites = data[i].favorite_count;
			allData.push(obj);
		}

		fs.writeFile('formatted_data.json', JSON.stringify(allData), function (
			err
		) {
			if (err) return console.log(err);
			console.log('JSON File written');
		});

		// fs.writeFile('all_data.json', JSON.stringify(tweets), function (err) {
		// 	if (err) return console.log(err);
		// 	console.log('JSON File written');
		// });
	}
});
