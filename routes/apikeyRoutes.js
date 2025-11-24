const express = require('express');
const router = express.Router();
const apikeyController = require('../controllers/apikeyController');

router.get('/apikey/generate', apikeyController.generateKey);
router.post('/generate', apikeyController.saveUserKey);

module.exports = router;