const { database } = require('../config/database');

const createChannel = async (user_id, name, is_private) => {
  const { data, error } = await database
  .from('channels')
  .insert([{ 
    id: uuidv4(),
    name,
    user_id,
    is_private
  }])
  .select();

  if (error) throw new Error(error.message);
  return data;
};

const getAllChannels = async () => {
    const { data, error } = await database
    .from('channels')
    .select('id, name, user_id, is_private, created_at')
    .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data;
};

const deleteChannel = async (channel_id, user_id) => {
  const { data: channel, error: channelError } = await database
    .from('channels')
    .select('user_id')
    .eq('id', channel_id)
    .single();

    if (channelError || !channel) throw new Error('Канал не найден.');
    if (channel.user_id !== user_id) throw new Error('Нет прав для удаления этого канала.');

    const { error } = await database
    .from('channels')
    .delete()
    .eq('id', channel_id);

  if (error) throw new Error(error.message);

  return { message: 'Канал удален.' };
}

const updateChannel = async (channel_id, user_id, new_name) => {

  const { data: channel, error: channelError } = await database
  .from('channels')
  .select('user_id')
  .eq('id', channel_id)
  .single();

if (channelError || !channel) throw new Error('Канал не найден.');
if (channel.user_id !== user_id) throw new Error('Нет прав для редактирования этого канала.');

const { data, error } = await database
  .from('channels')
  .update({ name: new_name })
  .eq('id', channel_id)
  .select();

if (error) throw new Error(error.message);

return data;
}

// const updateEvent = async () => {
//     const { data, error } = await database
//     .from('events')
//     .select('title, description, date, price, place, category');
//     if (error) throw new Error(error.message);
//     return data;
// };

// const deleteEvent = async () => {
//     const { data, error } = await database
//     .from('events')
//     .select('title, description, date, price, place, category');
//     if (error) throw new Error(error.message);
//     return data;
// };


module.exports = {
    createChannel,
    getAllChannels,
    deleteChannel,
    updateChannel,
  };