const express = require('express');
const { addChannel, listChannels, removeChannel, renameChannel } = require('../controllers/channelsController');
const { authentificate } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/channels', authentificate, addChannel);
router.post('/channels', authentificate, listChannels);
router.post('/channels/:channel_id', authentificate, removeChannel);
router.post('/channels/:channel_id', authentificate, renameChannel);

module.exports = router;