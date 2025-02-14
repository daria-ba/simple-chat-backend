const bcrypt = require('bcryptjs');
const { jwt } = require ('jsonwebtoken');
const { registerUser, findUserByLogin } = require('../services/userService');

const registerController = async (req, res) => {
  const { username, login, password } = req.body;

  if (!username || !login || !password) {
    return res.status(400).json({ message: 'Все поля обязательны для заполнения.' });
  }

  const userExists = await findUserByLogin(login);
  if (userExists) return res.status(400).json({ message: 'Логин должен быть уникальным' });

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
    await registerUser(username, login, hashedPassword);
    res.status(201).json({
      message: 'Пользователь зарегистрирован!'
      });

  } catch (error) {
    console.error('Ошибка при регистрации пользователя:', error.message);
    res.status(500).json({ message: 'Произошла ошибка при регистрации пользователя.' });
  }
};

const loginController = async (req, res) => {
  const { login, password } = req.body;

  const user = await findUserByLogin(login);
  if (!user) {
    return res.status(400).json({ message: 'Пользователь не найден' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Неверный пароль' });
  }

  const token = jwt.sign({ userId: user.id, login: user.login }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.status(200).json({ message: 'Успешный вход', token });

};

module.exports = { registerController, loginController };