const RedirectLog = require('../models/RedirectLog');

const logRedirectEvent = async (alias, userAgent, ip, geolocation) => {
  const newLog = new RedirectLog({
    alias,
    userAgent,
    ip,
    geolocation,
  });
  await newLog.save();
};

const getUrlAnalytics = async (alias) => {
  // Fetch analytics data for a specific alias
};

module.exports = { logRedirectEvent, getUrlAnalytics };