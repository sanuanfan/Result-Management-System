const mongoose = require('mongoose');
const reviewSchema = mongoose.Schema;

const review = new reviewSchema(
    {
        studentName :{type: String,required: true},
        studentId : {type: String,required: true},
        projectName : {type: String,required: true},
        projectMark : {type:Number, required: true},
        remarks : {type: String, required:true},
    }
);

module.exports = mongoose.model('reviewModel', review);