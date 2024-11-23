const mongoose = require('mongoose');

const purchaseSchema = mongoose.Schema({
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

const purchaseModel = mongoose.model('Purchase', purchaseSchema);

module.exports = {purchaseModel}