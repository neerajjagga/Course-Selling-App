const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    fromAdminId : {
        type: mongoose.Schema.Types.ObjectId, 
        ref : 'Admin'
    },
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
    },
    author : {
        type: mongoose.Schema.Types.ObjectId, 
        ref : 'Admin',
        required : true,
    }
},
{
    timestamps : true
})


const courseModel = new mongoose.model('Course', courseSchema);

module.exports = {courseModel}