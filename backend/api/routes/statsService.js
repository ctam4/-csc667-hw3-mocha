const express = require('express');
const router = express.Router();
const redis = require('../redis.js');

router.get('/get', (req, res) => {
  console.log(redis);
  redis.get('calls', (err, value) => {
    if (err) {
      console.log(err);
      res.sendStatus(500).end();
    }
    if (value === null) {
      value = 0;
    }
    res.send(`The current value of calls is ${value}.`);
  });
});

module.exports = router;
