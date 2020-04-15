const express = require('express');
const router = express.Router();
const redis = require('../redis.js');

let users = [
  {
    email: 'root@localhost',
    password: '1234',
  }
];

router.post('/authenticate', async (req, res) => {
  const params = req.body;
  let status, response;
  // validate params
  if (Object.keys(params).length == 1 && params.hasOwnProperty('token') && params.token.length > 0) {
    // decode base64 token to two items
    let decoded = atob(params.token).split(":");
    decoded[0] = decoded[0].toLowerCase;
    // validate with users array
    if (users.some(({ email, password }) => email === decoded[0] && password === decoded[1])) {
      status = 'OK';
    }
    else {
      status = 'ERROR';
      response = 'Invalid email or password.';
    }
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
  if (Object.keys(params).length == 2 && params.hasOwnProperty('email') && params.email.length > 0 && params.hasOwnProperty('password') && params.password.length > 0) {
    // add to user array
    let user = {
      email: params.email.toLowerCase,
      password: params.password,
    };
    if (users.push(user)) {
      status = 'OK';
    }
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
