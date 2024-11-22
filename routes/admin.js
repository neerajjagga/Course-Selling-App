const express = require('express');
const {createAdmin, loginAdmin, createCourse} = require('../controllers/admin');
const {adminAuth} = require('../middlewares/adminAuth');
const adminRouter = express.Router();

adminRouter.post('/signup', createAdmin);
adminRouter.post('/login', loginAdmin);
adminRouter.post('/addcourse', adminAuth, createCourse);

module.exports = {adminRouter}
