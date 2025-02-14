const { database } = require('../config/database');

const registerUser = async (username, login, password) => {
    const userData = { username, login, password };
    try {
        const response = await database
        .from('users')
        .insert([userData])
        .select();

        const { data, error } = response;

        if (error) {
            console.error('Ошибка в registerUser:', error.message);
            throw new Error(error.message);
        }
        return { status: 'success', data };
    } catch (error) {
        console.error('Ошибка в registerUser:', error.message);
        throw new Error(error.message);
    }
}

const findUserByLogin = async (login) => {
    const { data, error } = await database
    .from('users')
    .select('login')
    .eq('login', login)
    .maybeSingle();
    if (error) throw new Error(error.message);
    return data;
}

module.exports = { registerUser, findUserByLogin };