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

  let url = `https://api.meetup.com/find/groups?key=${process.env.MEETUP_API}&location=${req.query.city}&radius=1&category=34&order=members`;

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
