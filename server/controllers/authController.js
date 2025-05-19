//Logic for login and register

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {createUser, getUserbyUsername} = require('../models/userModels')
const {key, expiresIn} = require('../config/jwt.js')

const register = async (req, res) => {
    const {username, password} = req.body;

    //check if the username exists in the db
    //const user = await pool.query(`SELECT * FROM auth.users WHERE username=${username}` //do not use this, vulnerable to sql injection.
    try{
        const userCheck = await getUserbyUsername(username)
        if(userCheck.length > 0){
            return res.status(409).json({message:"Username already exists"})
        }
        const hash = await bcrypt.hash(password, 10);
        await createUser(username, hash);
        res.status(202).json({message:'user created'})
    }
    catch(err){
        res.status(400).json({message:err})
    }
}

const login = async(req, res) => {
    const {username, password} = req.body;
    try{
        const user = await getUserbyUsername(username);

        //console.log(user+"\n"+user.username+"\n"+user.password)
        
        if(!user){
            res.status(400).json({message:"User doesn't exist"})
        }

        const match = await bcrypt.compare(password, user.password);
        if(!match){
            res.status(400).json({message:"Invalid username or password"});
        }
        const token = jwt.sign({id:user.id, username:user.username}, key, {expiresIn})
        res.json({token})
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {register, login};

