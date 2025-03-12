// const { use } = require('../routes/messagesRoute');
const { createMessage, getMessage, deleteMessage } = require('../services/messagesService');

const sendMessageController = async (req, res) => {
  try {
    const { content, reply_to_id, user_id, channel_id } = req.body;
    // console.log('controller message data',  content, reply_to_id, user_id, channel_id);
    // const user_id = req.user.id;
    const message = await createMessage( content, reply_to_id, user_id, channel_id );
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMessageController = async (req, res) => {
  try {
    const { channel_id } = req.params;
    if (!channel_id) {
      return res.status(400).json({ error: "channel_id is required" });
  }
    const message = await getMessage(channel_id)
    // console.log('messages getted', message);
    res.json(message);
  } catch (error) {
    console.error("Error fetching messages:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const deleteMessageController = async (req, res) => {
  console.log('delete controller', req.params)
  const { id, user_id } = req.params;
  console.log('delete controller', req.params)
  try {
    // const { id, user_id } = req.params;
    const result = deleteMessage(id, user_id);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    res.json(result);
  } catch (error) {
    console.error('Ошибка при удалении сообщения:', error.message);
    res.status(500).json({ error: error.message });
  }

}

module.exports = {
  sendMessageController,
  getMessageController,
  deleteMessageController,
}