const mongoose = require('mongoose')
const submissionSchema = mongoose.Schema

const SubmissionSchema = new submissionSchema(
    {
        studentName:{type:String,required:true},
        studentId:{type:String,required:true},
        projectTitle:{type:String,required:true},
        submitDate:{ type:Date, required:true},
        marks:{type:Number,required:true},
        comments:{type:String,required:true},
    }
);
module.exports= mongoose.model('submissionModel',SubmissionSchema);