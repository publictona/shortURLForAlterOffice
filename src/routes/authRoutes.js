const express = require('express');
const { loginWithGoogle, googleCallback, logout } = require('../controllers/authController');

const router = express.Router();

router.get('/google', loginWithGoogle);
router.get('/google/callback', googleCallback);
router.get('/logout', logout);

module.exports = router;