const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');

router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/', userController.createUser);
router.get('/', adminController.getAllUsers);

module.exports = router;