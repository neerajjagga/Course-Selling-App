const express = require('express');
const {seeAllCourses} = require('../controllers/home')
const homeRouter = express.Router();


homeRouter.get('/courses', seeAllCourses);

module.exports = {homeRouter}
