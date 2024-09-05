const mongoose = require('mongoose');
const linkedInSchema = mongoose.Schema;

const LinkedInSchema = new linkedInSchema({
    studentName:{type:String, required:true},
    studentId:{type:String, required:true},
    projectTitle:{type:String, required:true},
    postDate:{type:Date, required:true},
    postScore:{type:Number, required:true},
    linkedInLink:{type:String, required:true},
    remarks:{type:String, required:true}
})
module.exports = mongoose.model('linkedInModel',LinkedInSchema)