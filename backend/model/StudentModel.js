const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    studentId: { type: String, required: true, unique: true },
    studentName: { type: String, required: true },
    domainName: { type: String, required: true }
});

module.exports = mongoose.model('Student', StudentSchema);
