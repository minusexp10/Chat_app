require('dotenv').config();

module.exports={
    key: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
}
