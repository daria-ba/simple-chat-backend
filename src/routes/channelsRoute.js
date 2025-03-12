const express = require('express');
const { addChannel, listChannels, removeChannel, renameChannel } = require('../controllers/channelsController');
const { authentificate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/channels', addChannel);
router.get('/channels', listChannels);
router.delete('/channels/:id', removeChannel);
router.patch('/channels/:id', renameChannel);

module.exports = router;