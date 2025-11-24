const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const apikeyController = require('../controllers/apikeyController'); 

router.post('/register', adminController.register);
router.post('/login', adminController.login);

router.get('/users', adminController.getAllUsers);
router.get('/apikeys', apikeyController.getAllApiKeys);
router.post('/apikeys', apikeyController.createApiKey);
router.put('/apikeys/:id', apikeyController.updateApiKey);
router.delete('/apikeys/:id', apikeyController.deleteKey);
router.get('/stats', adminController.getDashboardStats);

module.exports = router;