const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create User Baru (POST /api/users) <-- FITUR BARU
router.post('/', userController.createUser);

// Update User (PUT /api/users/:id)
router.put('/:id', userController.updateUser);

// Delete User (DELETE /api/users/:id)
router.delete('/:id', userController.deleteUser);

module.exports = router;