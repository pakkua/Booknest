const express = require('express');
const router = express.Router();
const db = require('../db');
const db= require('../db1');
const authController = require('../controllers/authController');

router.post('/register', authController.registerUser);

module.exports = router;
