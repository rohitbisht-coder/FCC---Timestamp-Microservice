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


app.get("/api/:date?", function (req, res) {
  let dateString = req.params.date;

  // If no date is provided, use the current time
  let date;
  if (!dateString) {
    date = new Date();
  } else {
    // Check if the date is a Unix timestamp or a string that can be parsed into a valid date
    if (isNaN(dateString)) {
      // If the dateString is not a number, attempt to parse it as a date
      date = new Date(dateString);
    } else {
      // If it's a valid Unix timestamp, convert it
      date = new Date(parseInt(dateString));
    }
  }

  // If the date is invalid, return an error message
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Otherwise, return the Unix timestamp and the UTC string
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
