const ShortURL = require('../models/ShortURL');
const Analytics = require('../models/Analytics');

exports.getUrlAnalytics = async (req, res) => {
  try {
    const { alias } = req.params;
    const url = await ShortURL.findOne({ shortUrl: alias });
    if (!url) return res.status(404).json({ error: 'URL not found' });

    const totalClicks = await Analytics.countDocuments({ shortUrl: url._id });
    const uniqueClicks = await Analytics.distinct('ipAddress', {
      shortUrl: url._id,
    }).length;

    res.json({ totalClicks, uniqueClicks });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};