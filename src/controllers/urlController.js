const ShortURL = require('../models/ShortURL');
const Analytics = require('../models/Analytics');

exports.createShortUrl = async (req, res) => {
  console.log('Request Body:', req.body);
  try {
    const { longUrl, customAlias, topic } = req.body;
    const newUrl = await ShortURL.create({
      longUrl,
      customAlias: customAlias || undefined,
      topic,
      createdBy: req.user ? req.user.id : null,
    });
    console.log('New URL:', newUrl);
    res.status(201).json(newUrl);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};


exports.redirectShortUrl = async (req, res) => {
  try {
    const { alias } = req.params;

    const url = await ShortURL.findOne({
      $or: [{ customAlias: alias }, { _id: alias }],
    });

    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

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
