const ShortUrl = require('../models/ShortURL');
const crypto = require('crypto');

const generateAlias = () => crypto.randomBytes(4).toString('hex');

const createShortUrl = async (longUrl, customAlias, topic, userId) => {
  const alias = customAlias || generateAlias();
  const newShortUrl = new ShortUrl({
    longUrl,
    alias,
    topic,
    userId,
  });
  await newShortUrl.save();
  return newShortUrl;
};

const findUrlByAlias = async (alias) => {
  return await ShortUrl.findOne({ alias });
};

module.exports = { createShortUrl, findUrlByAlias };