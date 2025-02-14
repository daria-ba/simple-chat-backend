const { createChannel, getChannel } = require('../services/eventService');

const addChannel = async (req, res) => {
  try {
    const { name } = req.body;
    const user_id = req.user.id;
    const channel = await createChannel(user_id, name);

    res.status(201).json(channel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const listChannels = async (req, res) => {
  try {
    const channels = await getChannel();

    res.status(200).json(channels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeChannel = async (req, res) => {
  try {
    const { channel_id } = req.params;
    const user_id = req.user.id;

    const result = await deleteChannel(channel_id, user_id);

    res.json(result);
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

const renameChannel = async (req, res) => {
  try {
    const { channel_id } = req.params;
    const { name } = req.body;
    const user_id = req.user.id;

    const updatedChannel = await updateChannelName(channel_id, user_id, name);

    res.json(updatedChannel);
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

module.exports = {
  addChannel,
  listChannels,
  removeChannel,
  renameChannel,
}