const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET semua user
router.get('/', userController.getAllUsers);

// POST user baru
router.post('/', userController.createUser);

// GET user by id
router.get('/:id', userController.getUserById);

// DELETE user by id
router.delete('/:id', userController.deleteUserById);

module.exports = router;
