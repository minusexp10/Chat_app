const pool = require('../db')


const createUser = async (username, password) => {
    await pool.query('INSERT INTO auth.users (username,password) values ($1,$2)', [username, password]);
}

const getUserbyUsername = async (username) => {
    const user = await pool.query('SELECT * FROM auth.users WHERE username = $1', [username])
    return user.rows[0];
}

module.exports ={getUserbyUsername, createUser}
