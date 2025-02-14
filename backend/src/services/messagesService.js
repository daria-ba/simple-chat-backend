const { database } = require('../config/database');
import { v4 as uuidv4 } from 'uuid';

const createMessage = async (user_id, channel_id, content, reply_to_id = null) => {
  const { data, error } = await database
  .from('messages')
  .insert([{
    id: uuidv4(), 
    user_id, 
    channel_id, 
    content, 
    reply_to_id 
  }])
  .select();
  if (error) throw new Error(error.message);
  return data;
};

const getMessage = async () => {
  const { data, error } = await database
  .from('messages')
  .select('id, user_id, content, created_at, reply_to_id')
  .eq('channel_id', channel_id)
  .order('created_at', { ascending: true });
  if (error) throw new Error(error.message);
  return data;
};

module.exports = {
    createMessage,
    getMessage,
  };
