const mongoose = require('mongoose')
const assessmentsSchema = mongoose.Schema

const assessmentSchema = new assessmentsSchema(
    {
        studentName:{type:String,required:true},
        studentId:{type:String,required:true},
        Date:{ type:Date, required:true},
        assessmentType:{type:String,required:true},
        score:{type:Number,required:true}
    }
);
module.exports= mongoose.model('assessmentModel',assessmentSchema);