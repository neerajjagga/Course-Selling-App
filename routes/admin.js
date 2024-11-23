const express = require('express');
const {createAdmin, loginAdmin, createCourse, showMyCourses, addContent} = require('../controllers/admin');
const {adminAuth} = require('../middlewares/adminAuth');
const adminRouter = express.Router();

adminRouter.post('/signup', createAdmin);
adminRouter.post('/login', loginAdmin);
adminRouter.post('/addcourse', adminAuth, createCourse);
adminRouter.get('/mycourses', adminAuth, showMyCourses);
adminRouter.post('/courses/:courseId', adminAuth, addContent)

module.exports = {adminRouter}
