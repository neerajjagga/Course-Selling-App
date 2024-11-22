const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();

const adminSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
    },
    about : {
        type : String,
        required : true,
        trim : true,
        maxLength : 30,
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
    },
    phoneNumber : {
        type : Number,
        match : /^(\+91[-\s]?)?[6-9]\d{9}$/,
        trim : true,
        required : true,
    },
    profilePicUrl : {
        type : String,
        trim : true,
        validate(value) {
            if(!validator.isURL(value)) {
                throw new Error("Invalid profile picture url");
            }
        },
        default : "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
    },
    courses: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Course'  
    },
    lastLogin: {
        type: Date,
    },
    loginHistory: {
        type: [Date], // Array of login timestamps
    },
},
{
    timestamps : true
})

adminSchema.index({emailId : 1}, {phoneNumber : 1});

const jwt_secret_key_admin = process.env.JWT_SECRET_KEY_2;

adminSchema.methods.getJWT = async function() {
    const admin = this;
    const token = jwt.sign(
        {_id : admin._id, emailId: admin.emailId }, jwt_secret_key_admin, 
        {expiresIn : '1d'}
    );
    return token;
}


const adminModel = new mongoose.model('Admin', adminSchema);

module.exports = {adminModel}