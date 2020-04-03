const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const proxy = require('express-http-proxy');
const httpApp = express();
const httpsApp = express();
const httpPort = 5000;
const httpsPort = 5443;
const httpsOptions = {
  key: fs.readFileSync('../../server.key'),
  cert: fs.readFileSync('../../server.cert'),
};

httpApp.use("/api", proxy((process.env.API_HOST || "0.0.0.0") + ":6000", {
  https: false,
}));
httpApp.use("/", proxy((process.env.FILESERVER_HOST || "0.0.0.0") + ":4000", {
  https: false,
}));

httpsApp.use("/api", proxy((process.env.API_HOST || "0.0.0.0") + ":6443", {
  https: true,
}));
httpsApp.use("/", proxy((process.env.FILESERVER_HOST || "0.0.0.0") + ":4443", {
  https: true,
}));

http.createServer(httpApp).listen(httpPort);
https.createServer(httpsOptions, httpsApp).listen(httpsPort);
