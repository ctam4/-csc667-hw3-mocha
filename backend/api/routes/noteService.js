const express = require('express');
const router = express.Router();
const redis = require('../redis.js');

let gatewayUrl = process.env.GATEWAY_HOST || 'localhost';
if (process.env.GATEWAY_HTTP_PORT) {
  gatewayUrl += ':' + process.env.GATEWAY_HTTP_PORT;
}

router.use(async (req, res, next) => {
  const params = req.body;
  let authenticated = false;
  authenticated = true; //debug
  /*
  if (params.hasOwnProperty('token') && params.token.length > 0) {
    await fetch('http://' + gatewayUrl + '/auth/authenticate', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: params.token
      })
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('error ' + res.status);
      }
      return res.text();
    })
    .then((data) => {
      authenticated = true;
    })
    .catch(console.log);
  }
  */
  if (!authenticated) {
    res.sendStatus(401).end();
  }
  next();
});

router.post('/get', async (req, res) => {
  const params = req.body;
  let status, response;
  // validate params
  if (Object.keys(params).length == 2 && params.hasOwnProperty('user') && params.user.length > 0) {
    // retrieve from redis
    await redis
    .lrange(params.user, 0, -1)
    .then((reply) => {
      status = 'OK';
      response = JSON.stringify(reply);
    })
    .catch((err) => {
      status = 'ERROR';
      response = 'REDIS: ' + err;
    });
    // increase redis counter
    await redis.incr('calls');
  }
  else {
    status = 'ERROR';
    response = 'Invalid params.';
  }
  // send result
  res.send({
    status: status,
    date: new Date(),
    params: params,
    response: response,
  });
});

router.post('/create', async (req, res) => {
  const params = req.body;
  let status, response;
  // validate params
  if (Object.keys(params).length == 3 && params.hasOwnProperty('user') && params.user.length > 0 && params.hasOwnProperty('notesinput') && params.notesinput.length > 0) {
    // send to redis
    await redis
    .lpush(params.user, params.notesinput)
    .then((reply) => {
      status = 'OK';
      response = JSON.stringify(reply);
    })
    .catch((err) => {
      status = 'ERROR';
      response = 'REDIS: ' + err;
    });
    // increase redis counter
    await redis.incr('calls');
  }
  else {
    status = 'ERROR';
    response = 'Invalid params.';
  }
  // send result
  res.send({
    status: status,
    date: new Date(),
    params: params,
    response: response,
  });
});

module.exports = router;
