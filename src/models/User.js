const UserSchema = new mongoose.Schema({
    googleId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model('User', UserSchema);
  
  // src/models/ShortURL.js
  const shortid = require('shortid');
  const mongoose = require('mongoose');
  
  const ShortURLSchema = new mongoose.Schema({
    longUrl: { type: String, required: true },
    shortUrl: { type: String, default: shortid.generate, unique: true },
    customAlias: { type: String, unique: true },
    topic: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model('ShortURL', ShortURLSchema);
  
  // src/models/Analytics.js
  const mongoose = require('mongoose');
  
  const AnalyticsSchema = new mongoose.Schema({
    shortUrl: { type: mongoose.Schema.Types.ObjectId, ref: 'ShortURL', required: true },
    timestamp: { type: Date, default: Date.now },
    userAgent: { type: String },
    ipAddress: { type: String },
    osType: { type: String },
    deviceType: { type: String },
    geolocation: { type: Object },
  });
  
  module.exports = mongoose.model('Analytics', AnalyticsSchema);