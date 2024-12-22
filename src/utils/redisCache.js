const redis = require('ioredis');
const client = new redis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
});

const setCache = (key, value, duration) => {
  client.set(key, JSON.stringify(value), 'EX', duration);
};

const getCache = async (key) => {
  const data = await client.get(key);
  return data ? JSON.parse(data) : null;
};

module.exports = { setCache, getCache };