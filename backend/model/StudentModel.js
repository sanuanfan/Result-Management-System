const mongoose = require('mongoose');
const TotalMarks = require('../model/DashboardModel')
const StudentSchema = new mongoose.Schema({
    studentId: { type: String, required: true, unique: true },
    studentName: { type: String, required: true },
    domainName: { type: String, required: true }
});




StudentSchema.post('save', async function(doc) {
    try {
        // Ensure the student's total marks are updated even if there is no data
        const totalMarks = {
            studentName: doc.studentName,
            studentId: doc.studentId,
            domainName: doc.domainName || "Unknown",
            totalAttendanceMarks: 0,
            totalAssessmentMarks: 0,
            totalProjectMarks: 0,
            totalMarks: 0
        };

        await TotalMarks.findOneAndUpdate(
            { studentId: doc.studentId }, 
            totalMarks,
            { upsert: true, new: true }
        );

        console.log(`Total marks updated for new student ${doc.studentId}`);
    } catch (error) {
        console.error("Error updating total marks for new student:", error);
    }
});



module.exports = mongoose.model('Student', StudentSchema);
