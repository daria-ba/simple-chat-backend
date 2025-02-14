const express = require('express');
const { sendMessage, getMessage } = require('../controllers/messageController');
const { authentificate } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/messages', authentificate, getMessage);
router.post('/messages/:channel_id', authentificate, sendMessage);

module.exports = router;