const express = require('express');
const router = express.Router();
const apikeyController = require('../controllers/apikeyController');

// Rute 1: Untuk generate string random
// URL nanti: http://localhost:3000/api/apikey/generate
router.get('/apikey/generate', apikeyController.generateKey);

// Rute 2: Untuk simpan data ke database
// URL nanti: http://localhost:3000/api/generate
router.post('/generate', apikeyController.saveUserKey);

module.exports = router;