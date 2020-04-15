const express = require('express');
const router = express.Router();
const redis = require('../redis.js');

router.get('/get', async (req, res) => {
  await redis
  .get('calls')
  .then((reply) => {
    if (reply === null) {
      reply = 0;
    }
    res.send(`The current value of 'calls' is ${reply}.`);
  })
  .catch((err) => {
    console.log(err);
    res.sendStatus(500).end();
  });
});

router.get('/', (req, res) => res.sendStatus(400).end());

module.exports = router;
