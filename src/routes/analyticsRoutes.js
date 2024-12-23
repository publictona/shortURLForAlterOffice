const express = require('express');
const router = express.Router();
const { getUrlAnalytics, getTopicAnalytics, getOverallAnalytics } = require('../controllers/analyticsController');
const { authenticateUser } = require('../middlewares/authMiddleware');


router.get('/:alias', getUrlAnalytics);
// router.get('/topic/:topic', getTopicAnalytics);
// router.get('/overall', getOverallAnalytics);

module.exports = router;