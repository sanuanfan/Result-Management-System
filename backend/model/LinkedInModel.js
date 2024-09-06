const mongoose = require('mongoose');
const linkedInSchema = mongoose.Schema;

const LinkedInSchema = new linkedInSchema({
    studentName: { type: String, required: true },
    studentId: { type: String, required: true },
    projectTitle: { type: String, required: true },
    postDate: { type: Date, required: true },
    postScore: { type: Number, required: true },
    linkedInLink: { type: String, required: true },
    remarks: { type: String, required: true }
});

// Add an index to enforce unique studentId and studentName combination
LinkedInSchema.index({ studentId: 1, studentName: 1 }, { unique: true });

// Middleware to check for consistent studentName for each studentId
LinkedInSchema.pre('save', async function (next) {
    const existingRecord = await mongoose.model('linkedInModel').findOne({ studentId: this.studentId });
    
    if (existingRecord && existingRecord.studentName !== this.studentName) {
        // If a different studentName is found for the same studentId, throw an error
        const err = new Error('This studentId already exists with a different studentName.');
        next(err);
    } else {
        next();
    }
});

module.exports = mongoose.model('linkedInModel', LinkedInSchema);
