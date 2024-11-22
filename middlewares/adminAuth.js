const {adminModel} = require('../models/admin');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const adminAuth = async(req, res, next) => {
    try {
        const {token} = req.cookies;
        if(!token) {
            throw new Error("Token is not valid, relogin again");
        }
        const jwt_secret_key_admin = process.env.JWT_SECRET_KEY_2;
    
        const decodedObj = jwt.verify(token, jwt_secret_key_admin)
        const {_id, emailId} = decodedObj;
        const admin = await adminModel.findOne({_id, emailId});
        
        if(!admin) {
            return res.status(400).json({
                message : "Token is not verified, Re-login again"
            })
        }
        req.admin = admin;
        next();
        
    } catch (error) {
        res.status(400).json({
            Error : error.message
        })
    }
}

module.exports = {adminAuth}