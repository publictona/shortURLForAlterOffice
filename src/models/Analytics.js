const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  shortUrl: { type: mongoose.Schema.Types.ObjectId, ref: 'ShortURL', required: true },
  userAgent: { type: String },
  ipAddress: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Analytics', analyticsSchema);
