const {adminModel} = require('../models/admin-model')
const {courseModel} = require('../models/course-model')
const {validateCourseData} = require('../utils/validation')
const bcrypt = require('bcrypt');


const createAdmin = async (req, res) => {
    try {
        const {name, about, emailId, password, phoneNumber} = req.body;

        // find -> is the emailId is already registered
        const isEmailId = await adminModel.findOne({emailId, phoneNumber});
        if(isEmailId) {
            return res.status(400).json({
                message : `${emailId} or ${phoneNumber}-> admin is already registered - Login`
            })
        }
        // generate hash of the password 
        const hashedPassword = await bcrypt.hash(password, 15);
        const admin = new adminModel({
            name,
            about,
            emailId,
            password : hashedPassword,
            phoneNumber
        })

        await admin.save();

        res.status(200).json({
            message : "Admin created successfully"
        })
    } catch (error) {
        res.status(400).json({
            mesage : "Error comming while creating new admin",
            Error : error.message
        })
    }
}

const loginAdmin = async (req, res) => {
    try {

        const {emailId, password, phoneNumber} = req.body;
        // find a person with that emailId
        const admin = await adminModel.findOne({emailId});
        if(!admin) {
            return res.status(400).json({
                message : `Invalid credentials`
            })
        }
        // check if password is correct
        const isPasswordValid = await bcrypt.compare(password, admin.password);

        const isPhoneNumberValid = await adminModel.findOne({phoneNumber})

        if(!isPasswordValid || !isPhoneNumberValid) {
            return res.status(400).json({
                message : `Invalid credentials`
            })
        }
        const token = await admin.getJWT();
        res.cookie("token", token);
        
        res.status(200).json({
            message : "Login successfully"
        })

    } catch (error) {
        res.status(400).json({
            mesage : "Error comming while login",
            Error : error.message
        })
    }
}

const createCourse = async (req, res) => {
    try {
        const loggedInAdmin = req.admin;
        console.log(loggedInAdmin);

        validateCourseData(req);
        const {name, description, price, content} = req.body;

        const course = new courseModel({
            fromAdminId : loggedInAdmin._id,
            name,
            description,
            price,
            content,
            author : loggedInAdmin._id
        });

        await course.save();

        // push courseId into the admin courses field

        res.status(200).json({
            message : "Course added succcessfully"
        })

    } catch (error) {
        res.status(400).json({
            mesage : "Error comming while creating course",
            Error : error.message
        })
    }
}

const showMyCourses = async(req, res) => {
    try {
        const loggedInAdmin = req.admin;
        const COURSE_SAFE_DATA = "name description price content  -_id"

        const allAdminCourses = await courseModel.find({fromAdminId : loggedInAdmin._id})
        .select( COURSE_SAFE_DATA)
        
        if(allAdminCourses.length === 0) {
            return res.status(300).json({
                message : "You have no courses yet. Add now"
            })
        }

        res.status(200).json({
            allCourses : allAdminCourses
        })

    } catch (error) {
        res.status(400).json({
            message : "Error coming" + error.mesage
        })
    }
}

const addContent = async(req, res) => {
    try {
        const loggedInAdmin = req.admin;
        const courseId = req.params.courseId;
        const contentUrl = req.query.contentUrl;

        // first ccourse is available of the admin
        const course = await courseModel.findOne({_id : courseId, fromAdminId : loggedInAdmin._id});

        if(!course) {
            return res.status(400).json({
                message : "Cannot find course"
            })
        }

        course.content.push(contentUrl);
        await course.save();
        
        res.status(201).json({
            message : "Content added successfully"
        })

    } catch (error) {
        res.status(400).json({
            Error : "Error coming " + error.message
        })
    }
}

module.exports = {
    createAdmin,
    loginAdmin,
    createCourse,
    showMyCourses,
    addContent
}