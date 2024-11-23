const {courseModel} = require('../models/course-model')
const validator = require('validator');

function validateSignupData(req) {
    const {name, emailId, password} = req.body;

    if(!name || !emailId || !password) {
        throw new Error("Enter valid data : data should not be empty");
    }
    else if(!name.length >= 15) {
        throw new Error("Name is too long : Ideally is should in between 3 to 15");
    }
    else if(password.length < 8 || password.length > 15) {
        throw new Error("Password is too long : Ideally is should in between 8 to 15");
    } 
    else if(!validator.isEmail(emailId)) {
        throw new Error("Enter valid emailId");
    }
    else if(!validator.isStrongPassword(password)) {
        "Enter a strong passowrd";
    }
}

function validateLoginData(req) {
    const {emailId, password} = req.body;

    if(!emailId || !password) {
        throw new Error("Enter valid data : data should not be empty");
    }
}

const validateCourseId = async(courseId) => {
    const isCourseIdValid = await courseModel.findOne({_id : courseId});
    
    if(!isCourseIdValid) {
        throw new Error("No course found");
    }
} 

const validateCourseData = async(req) => {
    const {name, description, price, content} = req.body;

    if(!name) {
        throw new Error("Course name must be present")
    }
    else if(!description) {
        throw new Error("Description name must be present")
    }
    else if(!price) {
        throw new Error("Price name must be present")
    }
    else if(content.length < 1) {
        throw new Error("Content must have one video present")
    }
}


module.exports = {
    validateSignupData,
    validateLoginData,
    validateCourseId,
    validateCourseData
}