const { database } = require('../configs/database');

const createMessage = async (content, reply_to_id, user_id, channel_id = null) => {
  const { data, error } = await database
  .from('messages')
  .insert([{
    content,
    reply_to_id,
    user_id,
    channel_id
  }])
  .select();
  if (error) throw new Error(error.message);
  return data;
};

const getMessage = async (channel_id) => {
  const { data, error } = await database
  .from('messages')
  .select('id, content, reply_to_id, is_deleted, created_at, updated_at, user_id, channel_id, users!messages_user_id_fkey(login)')
  .eq('channel_id', channel_id)
  .order('created_at', { ascending: true });
  if (error) throw new Error(error.message);
  return data;
};

const deleteMessage = async (messageId, userId) => {
  try {
    const { data: messages, error: messageError } = await database
      .from('messages')
      .select('id, user_id')
      .eq('id', messageId)
      .limit(1);
      
      if (messageError) {
        console.error('Ошибка при получении сообщения:', messageError);
        throw new Error('Ошибка при запросе к базе данных.');
      }
  
      if (!messages || messages.length === 0) {
        throw new Error('Сообщение не найдено.');
      }
  
    if (Number(userId) !== messages[0].user_id) throw new Error('Нет прав для удаления этого сообщения.');

    const { error: deleteError } = await database
      .from('messages')
      .delete()
      .eq('id', messageId);

      if (deleteError) {
        console.error('Ошибка при удалении:', deleteError);
        return { error: deleteError.message };
      }

    return { message: 'Сообщение удалено.' };
  } catch (error) {
    console.error('Ошибка:', error.message);
    return { error: error.message };
  }
};

module.exports = {
    createMessage,
    getMessage,
    deleteMessage,
  };
