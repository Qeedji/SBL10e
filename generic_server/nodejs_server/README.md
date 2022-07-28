# SBL NodeJs and Express server for generic_server app

## Configure the server

In order to use Express with TLS, you must generate the server's certificate and key.
see documentation here: https://expressjs.com/en/advanced/best-practice-security.html#use-tls

Once you have the two files, copy them in this folder and set the two variables by editing generic_server.js file (variables are *keyFilename* and *certificateFilename*).

```Javascript
// Edit variables here
var keyFilename = ""; // Set key filename
var certificateFilename = ""; // Set certificate filename
```

Finally edit the *device* variable in the generic_server.js file with the PSN of your SBL device.

```Javascript
// Edit variable here
var device = {
  // Set your SBL PSN here, for example 01320-00001
  "00000-00000": {
    "state": "steady", // steady, flashing, off
    "color": "green" // red, orange, green, yellow, blue
  }
};
```

## Launch the server

First of all install NodeJs on your computer: https://nodejs.org/en/download/

Then open a shell in this folder and enter the folowing commands :
- **npm install**
- **node ./generic_server.js**

## Configure your SBL device:

You must set the datasource server URL on your SBL device configuration.
First of all, retrieve the IPv4 address of your server.

Then configure your SBL by going on its WebUI in a web browser and under the *Servers* tab set th URL:

"https://*<ip_address>*/generic_server/v1/leds/light/{$deviceInfo:psn}"

With *<ip_address>* the IPv4 address of your server.

in the folowing example picture, the SBL IPv4 address is *192.168.1.150* and the server IPv4 address is *192.168.1.122*.

![Alt text](webui.png?raw=true)