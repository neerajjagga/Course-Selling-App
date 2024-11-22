const mongoose = require('mongoose');

const myCoursesSchema = mongoose.Schema({
    fromUserId : {
        type: mongoose.Schema.Types.ObjectId, 
        ref : 'User'
    },
    myCourses : {
        type : [{
            type: mongoose.Schema.Types.ObjectId, 
            ref : 'Course'
        }]
    }
},
{
    timestamps : true
})

const myCoursesModel = mongoose.model('MyCourses', myCoursesSchema);

module.exports = {myCoursesModel}