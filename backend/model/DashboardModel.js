const mongoose = require('mongoose');

const totalMarksSchema = new mongoose.Schema({
    studentName:{type: String, required: true},
    studentId: { type: String, required: true, unique: true },
    domainName: { type: String, required: true },
    totalAttendanceMarks: { type: Number, required: true },
    totalAssessmentMarks: { type: Number, required: true },
    totalProjectMarks: { type: Number, required: true },
    totalMarks: { type: Number, required: true }
});

module.exports = mongoose.model('TotalMarks', totalMarksSchema);
