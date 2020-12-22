const path = require('path');
const jekyll = require('./midware/jekyll3');
const express = require('express');
//const RED = require("node-red");
const http = require('http');
//const FakeWebServer = require('./fake_web_server.js');
const app = express()
var server = http.createServer(app);
const port = 3001;

//Start fake Jekll
const root = path.resolve(__dirname, "public");
jekyll.setup(app, root);
app.use(express.static(root))
server.listen(port);
console.log(`Example app listening at http://localhost:${port}`)
