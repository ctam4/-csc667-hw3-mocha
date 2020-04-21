const express = require('express');
const router = express.Router();
const redis = require('../redis.js');

router.use(async (req, res, next) => {
  const params = req.body;
  if (params.hasOwnProperty('token') && params.token.length > 0) {
    // retrieve from redis
    await redis
    .lrange('users', 0, -1)
    .then((reply) => {
      // validate email / password pair
      if (!reply.some((token) => token === params.token)) {
        res.sendStatus(401).end();
      }
    })
    .catch((err) => {
      res.sendStatus(500).end();
    });
  }
  next();
});

router.post('/get', async (req, res) => {
  const params = req.body;
  let status, response;
  // validate params
  if (Object.keys(params).length == 1) {
    // decode base64 token to two items
    let decoded = Buffer.from(params.token, 'base64').toString().split(":");
    // retrieve from redis
    await redis
    .lrange(decoded[0], 0, -1)
    .then((reply) => {
      status = 'OK';
      response = reply;
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
    let decoded = Buffer.from(params.token, 'base64').toString().split(":");
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
