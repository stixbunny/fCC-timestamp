// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get("/api/:date?", (req, res) => {
  let date = req.params.date;
  //If it's empty
  if (date == "") {
    let dateObject = new Date();
    res.json({"unix": Date.parse(dateObject), "utc": dateObject.toUTCString()});
  }
  //if it's not Unix timestamp
  else if(Date.parse(date)) {
    let dateObject = new Date(date);
    res.json({"unix": Date.parse(date), "utc": dateObject.toUTCString()});
  }
  //It's Unix timestamp
  else if (!isNaN(date)) {
    let numberDate = parseInt(date);
    let dateObject = new Date(numberDate);
    res.json({"unix": numberDate, "utc": dateObject.toUTCString()});
  }
  //If it's invalid
  else {
    res.json({ error : "Invalid Date" });
  }
});
