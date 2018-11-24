require('dotenv').load();
const express = require('express');
const request = require('request');

const app = express();
const port = 8080

app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});

app.use(express.static("public"));
app.set('views', './public')
app.set('view engine', 'ejs')

app.get('/', (req, response) => {
  if (!req.query.city) {
  const title = 'Select a city';
  return response.render('index', {
      title,
      body: []
    })
  }
  const title = 'Technical Events Database for Local Cities';

  let url = `https://api.meetup.com/find/groups?` + `key=${process.env.MEETUP_API}` + `&city=Phoenix&radius=1&category=34&order=members`;

  // let meetupParams = {
  //   key: process.env.MEETUP_API_KEY,
  //   city: 'Phoenix',
  //   category_id: 34,
  // };

  request.get({
    url: url,
    json: true
  }, (err, res, body) => {
    if (err) {
      response.render('index', {
        //TODO: Add error page
        error: err
        })
    } else {
      response.render('index', {
        title,
        body
      })
    }
   })
})

// const getEvents = request(`https://api.meetup.com/find/groups?` + `key=${process.env.MEETUP_API}` + `&zip=11211&radius=1&category=34&order=members`, { json: true }, (err, res, body) => {
//   if (err) { return console.log(err); }
//   const newObject = {
//     meetupName : body[0].name,
//     meetupLink : body[0].link,
//     meetupCity : body[0].city,
//     meetupOrganizer : body[0].organizer.name
//   }
//   // console.log('NEW OBJECT', newObject);
// 	return newObject;
// });
