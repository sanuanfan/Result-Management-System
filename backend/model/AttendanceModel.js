const mongoose = require('mongoose');
const attendanceschema = mongoose.Schema;

const attendanceSchema = new attendanceschema(
    {
        studentName: { type: String, required: true },
        studentId: { type: String, required: true },
        Date: { type: Date, required: true},
        status:{type: String, required: true}
      }
);

module.exports = mongoose.model('attendanceModel',attendanceSchema);