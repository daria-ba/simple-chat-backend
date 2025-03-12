require('dotenv').config();
const express = require('express');
const cors = require('cors');
const socketio = require('socket.io');
const { Server } = require('socket.io');
const http = require('http');
const channelsRoutes = require('./routes/channelsRoute');
const authRoutes = require('./routes/authRoute');
const messageRoutes = require('./routes/messagesRoute');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());

app.use('/api/', channelsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/', messageRoutes);

io.on('connection', (socket) => {
  // console.log('Пользователь подключен:', socket.id);

  socket.on('newMessage', (msg) => {
    io.emit('message', msg);
  });

  socket.on('removeMessage', (msg) => {
    io.emit('message', msg);
  });

  socket.on('editMessage', (msg) => {
    io.emit('message', msg);
  });

  socket.on('newChannel', (channel) => {
    io.emit('message', channel);
  });

  socket.on('removeChannel', (channel) => {
    io.emit('message', channel);
  });

  socket.on('renameChannel', (channel) => {
    io.emit('message', channel);
  });

});

if (require.main === module) {
  const PORT = process.env.PORT || 3001;
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;