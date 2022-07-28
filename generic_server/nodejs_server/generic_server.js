const https = require('https');
const https_port = 443;
const fs = require('fs');
var express = require('express');


// Edit variables here
var keyFilename = ""; // Set key filename
var certificateFilename = ""; // Set certificate filename

const options = {
  key: fs.readFileSync(keyFilename),
  cert: fs.readFileSync(certificateFilename),
};

// Edit variable here
var device = {
  // Set your SBL PSN here
  "00000-00000": {
    "state": "off", // steady, flashing, off
    "color": "red"
  }
};

var app = express();
app.use(express.json());

https.createServer(options, app).listen(https_port);

const URL_PATH = "/generic_server/v1/leds/light/";
app.get(`${URL_PATH}*`, function (req, res) {
  console.log("req.url " + req.url);
  let psn = (req.url.substr(URL_PATH.length)).toLowerCase();
  console.log("App get " + URL_PATH + "* with psn " + psn);
  const resRegexp = psn.match(/^[0-9a-f]{5}-[0-9a-f]{5}$/i);
  if (resRegexp) {
    if (device[psn]) {
      res.status(200).send('{"state":"' + device[psn].state + '", "color":"' + device[psn].color + '"}');
    }
    else {
      console.log("psn + " + psn + " not found in device");
      res.status(404).send('psn + ' + psn + ' not found in device');
    }
  } else {
    console.log("Malformed psn");
    res.status(405).send('Malformed psn');
  }
})