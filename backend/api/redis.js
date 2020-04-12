const redis = require('redis');
const redisOptions = {
  host: process.env.REDIS_HOST || '127.0.0.1',
};

module.exports = redis.createClient(redisOptions);
