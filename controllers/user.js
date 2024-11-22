const {userModel} = require('../models/user');
const {myCoursesModel} = require('../models/myCourses');
const {validateSignupData, validateLoginData} = require('../utils/validation');
const bcrypt = require('bcrypt');


const createUser = async (req, res) => {
    try {
        validateSignupData(req);

        const {name, emailId, password} = req.body;

        // find -> is the emailId is already registered
        const isEmailId = await userModel.findOne({emailId});
        if(isEmailId) {
            return res.status(400).json({
                message : `${emailId} is already registered`
            })
        }
        // generate hash of the password 
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        const user = new userModel({
            name,
            emailId,
            password : hashedPassword
        })

        await user.save();

        res.status(200).json({
            message : "User created successfully"
        })
    } catch (error) {
        res.status(400).json({
            mesage : "Error comming while creating new user",
            Error : error.message
        })
    }
}

const loginUser = async (req, res) => {
    try {
        validateLoginData(req);

        const {emailId, password} = req.body;
        // find a person with that emailId
        const user = await userModel.findOne({emailId});
        console.log(user);
        if(!user) {
            return res.status(400).json({
                message : `User not found`
            })
        }
        // check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            return res.status(400).json({
                message : `Invalid credentials`
            })
        }
        const token = await user.getJWT();
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

const purchaseCourse = async(req, res) => {
    try {
        const courseId = req.params.courseId;

        const loggedInUser = req.user;
        console.log(loggedInUser._id);
        
        const userId = loggedInUser._id.toString();
        console.log(typeof userId);
        
        const findIfUserPurschaseACourseBefore = await myCoursesModel.findOne({fromUserId : loggedInUser._id});

        if(!findIfUserPurschaseACourseBefore) {
            const purchaseCourse = new myCoursesModel({
                fromUserId : userId,
                myCourses : courseId
            })
    
            await purchaseCourse.save();
    
            res.status(400).json({
                message : "Course purchased successfully"
            })
        }
        else {            
            findIfUserPurschaseACourseBefore.myCourses.push(courseId);
            
            const updateMyCourses = await myCoursesModel.findOneAndUpdate({fromUserId : userId}, findIfUserPurschaseACourseBefore,
            {new : true});
            
            res.status(400).json({
                message : "Course purchased successfully"
            })
        }
    } catch (error) {
        res.status(400).json({
            message : "Error is coming while purchasing course",
            Error : error.message
        })
    }
}

module.exports = {
    createUser,
    loginUser,
    purchaseCourse
}