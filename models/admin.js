const mongoose = require('mongoose');
const validator = require('validator')

const adminSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
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
        }
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


// const jwt_secret_key_admin = process.env.JWT_SECRET_KEY_ADMIN;

// userSchema.methods.getJWT = async function() {
//     const user = this;
//     const token = jwt.sign({_id : user._id}, jwt_secret_key_admin, {expiresIn : '7d'})
//     return token;
// }


const adminModel = new mongoose.model('Admin', adminSchema);

module.exports = {adminModel}