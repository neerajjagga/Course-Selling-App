const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
    content : {
        type : [{type : String}]
    }
},
{
    timestamps : true
})


const courseModel = new mongoose.model('Course', courseSchema);

module.exports = {courseModel}