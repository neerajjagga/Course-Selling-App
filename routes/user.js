const express = require('express');
const {createUser, loginUser, purchaseCourse, getMyPurchasedCourses} = require('../controllers/user')
const {userAuth} = require('../middlewares/userAuth')
const userRouter = express.Router();

userRouter.post('/signup', createUser);
userRouter.post('/login', loginUser);
userRouter.post('/purchase/:courseId', userAuth, purchaseCourse);
userRouter.get('/courses', userAuth, getMyPurchasedCourses);

module.exports = {userRouter}
