require('dotenv').config();
const express = require('express');
const cors = require('cors');
const channelsRoutes = require('./routes/channelsRoute');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messagesRoute');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/channels', channelsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;