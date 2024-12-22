const ShortURL = require('../models/ShortURL');
const Analytics = require('../models/Analytics');

exports.createShortUrl = async (req, res) => {
  try {
    const { longUrl, customAlias, topic } = req.body;
    const shortUrl = customAlias || undefined;
    const newUrl = await ShortURL.create({
      longUrl,
      customAlias: shortUrl,
      topic,
      createdBy: req.user.id,
    });
    res.status(201).json({
      shortUrl: newUrl.shortUrl,
      createdAt: newUrl.createdAt,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.redirectShortUrl = async (req, res) => {
  try {
    const { alias } = req.params;
    const url = await ShortURL.findOne({ shortUrl: alias });
    if (!url) return res.status(404).json({ error: 'URL not found' });

    // Log analytics
    await Analytics.create({
      shortUrl: url._id,
      userAgent: req.headers['user-agent'],
      ipAddress: req.ip,
    });

    res.redirect(url.longUrl);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};