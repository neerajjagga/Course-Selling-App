const express = require('express');
const {createUser, loginUser} = require('../controllers/user')
const userRouter = express.Router();

userRouter.post('/signup', createUser);
userRouter.post('/login', loginUser);

module.exports = {userRouter}
