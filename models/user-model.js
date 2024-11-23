const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const userSchema = mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : true,
    },
    emailId : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        minLength : 16,
        maxLength : 40,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid email address " + value);
            }
        }
    },
    password : {
        type : String,
        required : true,
        trim : true,
        validate(value) {
            if(!validator.isStrongPassword(value)) {
                throw new Error("Enter strong password " + value);
            }
        }
    }
},
{
    timestamps : true
})

const jwt_secret_key = process.env.JWT_SECRET_KEY;

userSchema.methods.getJWT = async function() {
    const user = this;
    const token = jwt.sign({_id : user._id}, jwt_secret_key, {expiresIn : '7d'})
    return token;
}

const userModel = new mongoose.model('User', userSchema);

module.exports = {userModel}