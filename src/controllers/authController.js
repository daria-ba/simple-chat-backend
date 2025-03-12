const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const { registerUser, findUserByLogin } = require('../services/userService');

const registerController = async (req, res) => {
  const { login, password } = req.body;
  console.log(login);
  if ( !login || !password) {
    return res.status(400).json({ message: 'Все поля обязательны для заполнения.' });
  }
  console.log(password)

  const userExists = await findUserByLogin(login);
  if (userExists) return res.status(400).json({ message: 'Логин должен быть уникальным' });

  const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
    await registerUser( login, hashedPassword);
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

  console.log('this is user', user);
  const isPasswordValid = await bcrypt.compare(password, user.hashed_password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Неверный пароль' });
  }

  const userId = user.id;

  const token = jwt.sign({ userId: user.id, login: user.login }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.status(200).json({ message: 'Успешный вход', token, login, userId });

};

module.exports = { registerController, loginController };