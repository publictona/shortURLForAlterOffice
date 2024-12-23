const mongoose = require('mongoose');

const shortUrlSchema = new mongoose.Schema({
  longUrl: { type: String, required: true },
  customAlias: { type: String, unique: true },
  topic: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ShortURL', shortUrlSchema);