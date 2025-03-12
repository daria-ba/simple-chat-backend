const express = require('express');
const { registerController, loginController } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', registerController);
router.post('/login', loginController);

module.exports = router;