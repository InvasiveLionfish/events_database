require('dotenv').load();

const express = require('express');
// var async = require('async');
// var router = express.Router();
const request = require('request');
const app = express();
// const meetup = require('meetup-api')({
// 	key: process.env.MEETUP_API
// });

const port = 8080

app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});

app.use(express.static("public"));
app.set('views', './public')
app.set('view engine', 'ejs')

app.get('/', (req, res) => res.send(getEvents))

// app.get('/', (req, res) => res.send(
// 	request(`https://api.meetup.com/find/groups?` + `key=${process.env.MEETUP_API}` + `&zip=11211&radius=1&category=34&order=members`, { json: true }, (err, res, body) => {
// 	  if (err) { return console.log(err); }
// 		console.log(process.env.MEETUP_API);
// 	  console.log(body);
// 	})
// ))

// console.log('Server running!');
// router.get('/', indexRoute);

// module.exports = router;

// function indexRoute(req, res, next) {
// 	async.parallel({ group: getGroup, events: getEvents }, renderIndex.bind(null, res, next));
// }
//
// function getGroup(callback) {
// 	meetup.getGroup({urlname: process.env.MEETUP_GROUP_NAME, fields: 'group_photo'}, callback);
// }
//
// function getEvents(callback) {
// 	meetup.getEvents({'group_urlname': process.env.MEETUP_GROUP_NAME}, callback);
// }
//
// function renderIndex(res, next, err, results) {
// 	if (err) {
// 		return next(err);
// 	}
//
// 	res.render('index', { group: results.group, events: results.events.results });
// }


const getEvents = request(`https://api.meetup.com/find/groups?` + `key=${process.env.MEETUP_API}` + `&zip=11211&radius=1&category=34&order=members`, { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
	// console.log(process.env.MEETUP_API);
	const meetupName = body[0].name;
	const meetupLink = body[0].link;
	const meetupCity = body[0].city;
	const meetupOrganizer = body[0].organizer.name;
  console.log(body);
	return `Check out ${meetupName} here: ${meetupLink}. This event is in ${meetupCity} and is organized by ${meetupOrganizer}`;
});
