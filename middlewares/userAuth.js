const {userModel} = require('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const userAuth = async(req, res, next) => {
    const {token} = req.cookies;
    if(!token) {
        throw new Error("Token is not valid");
    }
    const jwt_secret_key = process.env.JWT_SECRET_KEY;

    const decodedObj = jwt.verify(token, jwt_secret_key)
    const {_id} = decodedObj;
    const user = await userModel.findOne({_id});
    
    if(!user) {
        return res.status(400).json({
            message : "Token is not verified, Re-login again"
        })
    }
    req.user = user;
    next();
}

module.exports = {userAuth}