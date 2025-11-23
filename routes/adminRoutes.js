const express = require('express');
const router = express.Router();

// IMPORT DUA CONTROLLER (PENTING!)
const adminController = require('../controllers/adminController');
const apikeyController = require('../controllers/apikeyController'); 

// ==========================================
// RUTE AUTH ADMIN (Login & Register)
// ==========================================
router.post('/register', adminController.register);
router.post('/login', adminController.login);

// ==========================================
// RUTE DASHBOARD: USERS
// ==========================================
router.get('/users', adminController.getAllUsers);

// ==========================================
// RUTE DASHBOARD: API KEYS (CRUD LENGKAP)
// ==========================================

// 1. Ambil Semua Data (READ)
// Pakai apikeyController, bukan adminController
router.get('/apikeys', apikeyController.getAllApiKeys);

// 2. Buat Key Manual (CREATE)
// Method harus POST, bukan GET
router.post('/apikeys', apikeyController.createApiKey);

// 3. Update Expired Key (UPDATE)
// Method harus PUT dan butuh parameter ID (:id)
router.put('/apikeys/:id', apikeyController.updateApiKey);

// 4. Hapus Key (DELETE)
// Nama fungsi di controller adalah deleteKey
router.delete('/apikeys/:id', apikeyController.deleteKey);

module.exports = router;