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
  if (params.hasOwnProperty('token') && params.token.length > 0) {
    await fetch('http://' + gatewayUrl + '/auth/authenticate', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: params.token,
      }),
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('error ' + res.status);
      }
      return res.json();
    })
    .then((data) => {
      if (data.status === 'ERROR') {
        throw new Error(data.response);
      }
      else {
        authenticated = true;
      }
    })
    .catch(console.log);
  }
  if (!authenticated) {
    res.sendStatus(401).end();
  }
  next();
});

router.post('/get', async (req, res) => {
  const params = req.body;
  let status, response;
  // validate params
  if (Object.keys(params).length == 1) {
    // decode base64 token to two items
    let decoded = Buffer.from(params.token, 'base64').split(":");
    decoded[0] = decoded[0].toLowerCase;
    // retrieve from redis
    await redis
    .lrange(decoded[0], 0, -1)
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
  if (Object.keys(params).length == 2 && params.hasOwnProperty('notesinput') && params.notesinput.length > 0) {
    // decode base64 token to two items
    let decoded = atob(params.token).split(":");
    decoded[0] = decoded[0].toLowerCase;
    // send to redis
    await redis
    .lpush(decoded[0], params.notesinput)
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

router.get('/', (req, res) => res.sendStatus(400).end());

module.exports = router;
