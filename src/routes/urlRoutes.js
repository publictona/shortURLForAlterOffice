const express = require('express');
const { createShortUrl, redirectShortUrl } = require('../controllers/urlController');
const { authenticateUser } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/',  createShortUrl);
router.get('/:alias', redirectShortUrl);

module.exports = router;