const { database } = require('../configs/database');

const registerUser = async (login, hashedPassword) => {
    const userData = { login, hashed_password: hashedPassword };
    console.log('userdata in registeruser', userData);
    try {
        const {data, error} = await database
        .from('users')
        .insert([userData])
        .select();

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
    .select('id, login, hashed_password')
    .eq('login', login)
    .maybeSingle();
    if (error) throw new Error(error.message);
    return data;
}

module.exports = { registerUser, findUserByLogin };