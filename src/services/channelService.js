const { database } = require('../configs/database');

const createChannel = async (user_id, name, is_private) => {
  const { data, error } = await database
  .from('channels')
  .insert([{
    name,
    is_private
  }])
  .select();

  if (error) throw new Error(error.message);
  return data;
};

const getAllChannels = async () => {
    const { data, error } = await database
    .from('channels')
    .select('id, name, created_by, created_at, is_private, is_removable')
    .order('created_at', { ascending: false });
    
    if (error) throw new Error(error.message);
    return data;
};

const deleteChannel = async (channel_id) => {
  console.log('delete channel id', channel_id)
  const { data: channel, error: channelError } = await database
    .from('channels')
    .select('id')
    .eq('id', channel_id)
    .single();

    if (channelError || !channel) {
      console.error("Ошибка поиска канала:", channelError?.message || "Канал не найден.");
      throw new Error("Канал не найден.");
    }

    const { error: messagesError } = await database
    .from("messages")
    .delete()
    .eq("channel_id", channel_id);

  if (messagesError) {
    console.error("Ошибка удаления сообщений:", messagesError.message);
    throw new Error("Не удалось удалить сообщения, связанные с каналом.");
  }
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
  .select('created_by')
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