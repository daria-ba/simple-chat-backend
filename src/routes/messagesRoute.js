const express = require('express');
const { sendMessageController, getMessageController, deleteMessageController } = require('../controllers/messageController');
// const { authentificate } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/messages/:channel_id', getMessageController);
router.post('/messages', sendMessageController);
router.delete('/messages/:id/:user_id', deleteMessageController);

module.exports = router;