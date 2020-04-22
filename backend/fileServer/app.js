const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const app = express();
const httpPort = 4000;
const httpsPort = 4443;
const httpsOptions = {
  key: fs.readFileSync('../../server.key'),
  cert: fs.readFileSync('../../server.cert'),
};

app.use(express.static(path.join(__dirname, '../../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
});

http.createServer(app).listen(httpPort);
https.createServer(httpsOptions, app).listen(httpsPort);
