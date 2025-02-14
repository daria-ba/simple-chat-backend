const { createMessage, getMessage } = require('../services/eventService');

const sendMessage = async (req, res) => {
  try {
    const { channel_id, content, reply_to_id } = req.body;
    const user_id = req.user.id;
    const message = await createMessage({ user_id, channel_id, content, reply_to_id });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMessage = async (req, res) => {
  try {
    const { channel_id } = req.params;
    const message = await getMessage({
        where: { channel_id, is_deleted: false },
        order: [['created_at', 'ASC']],
    })
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  sendMessage,
  getMessage,
}