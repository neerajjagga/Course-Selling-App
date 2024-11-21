const express = require('express');
const {showMyProfile} = require('../controllers/profile');
const {userAuth} = require('../middlewares/userAuth')
const profileRouter = express.Router();


profileRouter.get('/view', userAuth, showMyProfile);

module.exports = {profileRouter}
