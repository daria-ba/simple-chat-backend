import { Server } from 'socket.io';

export default (server) => {
  const io = new Server(server, {
    cors: { origin: '*' }
  });

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('sendMessage', (message) => {
      io.to(message.channel_id).emit('newMessage', message);
    });

    socket.on('joinChannel', (channel_id) => {
      socket.join(channel_id);
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
};
