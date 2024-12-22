const express = require('express');
const { getUrlAnalytics, getTopicAnalytics, getOverallAnalytics } = require('../controllers/analyticsController');
const { authenticateUser } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/:alias', authenticateUser, getUrlAnalytics);
router.get('/topic/:topic', authenticateUser, getTopicAnalytics);
router.get('/overall', authenticateUser, getOverallAnalytics);