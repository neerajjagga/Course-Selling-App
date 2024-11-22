const {courseModel} = require('../models/course')


const seeAllCourses = async(req, res) => {
    try {
        const COURSE_SAFE_DATA = "name description price author -_id"
        const AUTHOR_SAFE_DATA = "name about profilePicUrl -_id"
        
        const allCourses = await courseModel
        .find({})
        .select(COURSE_SAFE_DATA)
        .populate("author", AUTHOR_SAFE_DATA);

        if(allCourses.length === 0) {
            res.status(200).json({
                message : "No courses available"
            })
        }

        res.status(200).json({
            Courses : allCourses
        })

    } catch (error) {
        res.status(400).json({
            message : "Error fetching data",
            Error : error.message
        })
    }
}


module.exports = {
    seeAllCourses
}