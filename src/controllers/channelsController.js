const { createChannel, getAllChannels, deleteChannel, updateChannel } = require('../services/channelService');

const addChannel = async (req, res) => {
  try {
    const { created_by, name, is_private } = req.body;
    // const created_by = req.user.id;
    const channel = await createChannel(created_by, name, is_private);
    console.log('channel req channel controller', req);
    res.status(201).json(channel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const listChannels = async (req, res) => {
  try {
    const channels = await getAllChannels();
    // console.log(channels)
    res.status(200).json(channels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeChannel = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteChannel(id);
    res.json(result);
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

const renameChannel = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const created_by = req.user.id;

    const updatedChannel = await updateChannel(id, created_by, name);

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