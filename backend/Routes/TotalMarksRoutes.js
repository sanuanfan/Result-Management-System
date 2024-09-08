const express = require('express');
const router = express.Router();
const TotalMarks = require('../model/DashboardModel');
const Student = require('../model/StudentModel');
const Attendance = require('../model/AttendanceModel');
const ProjectReview = require('../model/ReviewModel');
const Assessment = require('../model/AssessmentModel');
const Submission = require('../model/SubmissionModel');
const LinkedIn = require('../model/LinkedInModel');


// Function to calculate and store total marks for a student
async function calculateAndStoreTotalMarks(studentId) {
    console.log('Hello......');


    try {
        // 1. Fetch the student's domain name from the Students collection
        const student = await Student.findOne({ studentId });
        if (!student) {
            return { success: false, message: 'Student not found' };
        }

        

        const domainName = student.domainName;

        const attendanceRecords = await Attendance.find({ studentId });
        const totalWorkingDays = attendanceRecords.length;
        const presentDays = attendanceRecords.filter(record => record.status === 'Present').length;

        if (totalWorkingDays === 0) {
            // Handle case where there are no attendance records
            return { success: false, message: 'No attendance records found' };
        }

        const attendancePercentage = (presentDays / totalWorkingDays) * 100;
        const totalAttendanceMarks = attendancePercentage;

        // 2. Calculate total and average marks from Submission records
        // const attendanceRecords = await Attendance.find({ studentId });
        const projectReviewRecords = await ProjectReview.find({ studentId });
        const assessmentRecords = await Assessment.find({ studentId });
        const submissionRecords = await Submission.find({ studentId });
        const linkedinRecords = await LinkedIn.find({ studentId });

        // const totalAttendanceMarks = attendanceRecords.reduce((total, record) => total + record.marks, 0);

        // Assessment Marks - Sum all assessment marks and calculate the average
        const totalAssessmentMarks = assessmentRecords.reduce((total, record) => total + record.marks, 0);
        const avgAssessmentMarks = assessmentRecords.length > 0 ? totalAssessmentMarks / assessmentRecords.length : 0;
        

        // Project Review Marks - Sum all project review marks and calculate the average
        const totalProjectReviewMarks = projectReviewRecords.reduce((total, record) => total + record.marks, 0);
        const avgProjectReviewMarks = projectReviewRecords.length > 0 ? totalProjectReviewMarks / projectReviewRecords.length : 0;

        // Submission Marks - Sum all submission marks and calculate the average
        const totalSubmissionMarks = submissionRecords.reduce((total, record) => total + record.marks, 0);
        const avgSubmissionMarks = submissionRecords.length > 0 ? totalSubmissionMarks / submissionRecords.length : 0;

        // LinkedIn Marks - Sum all LinkedIn marks and calculate the average
        const totalLinkedInMarks = linkedinRecords.reduce((total, record) => total + record.marks, 0);
        const avgLinkedInMarks = linkedinRecords.length > 0 ? totalLinkedInMarks / linkedinRecords.length : 0;

        // Total Project mark is total average of review, submission and linkedin Marks

        const totalProjectMarks= (avgLinkedInMarks + avgSubmissionMarks + avgProjectReviewMarks)/3;
    
        // 3. Calculate the final total marks
        const totalMarks = totalAttendanceMarks +  avgAssessmentMarks + totalProjectMarks;
        console.log(studentId,domainName, totalMarks, totalAttendanceMarks, totalProjectMarks,totalAssessmentMarks);


        // 4. Store the calculated marks along with the domain name in the TotalMarks collection
        const existingRecord = await TotalMarks.findOne({ studentId });
        if (existingRecord) {
            // Update existing record
            existingRecord.domainName = domainName;
            existingRecord.totalAttendanceMarks = totalAttendanceMarks;
            existingRecord.totalAssessmentMarks = avgAssessmentMarks;
            existingRecord.totalProjectMarks = totalProjectMarks;
            existingRecord.totalMarks = totalMarks;
            await existingRecord.save();
        } else {
            // Create a new record
            const newTotalMarks = new TotalMarks({
                studentId,
                domainName, // Store the domain name here
                totalAssessmentMarks: avgAssessmentMarks,
                totalAttendanceMarks,
                totalProjectMarks,
                totalMarks
            });
            await newTotalMarks.save();

            
        }


        return { success: true, message: 'Marks calculated and stored successfully' };
    } catch (error) {
        console.error('Error calculating and storing marks:', error);
        return { success: false, message: 'Error calculating and storing marks' };
    }
}

// code to store the calculated scores in the Database

router.post('/calculate-total/:studentId', async (req, res) => {
    const { studentId } = req.params;

    console.log('Hello......');
    

    const result = await calculateAndStoreTotalMarks(studentId);

    console.log(calculateAndStoreTotalMarks(result.studentId));
    

    if (result.success) {
        return res.status(200).json({ message: result.message });
    } else {
        return res.status(500).json({ message: result.message });
    }
});


// code to fetch the stored total marks to dashboard

router.get('/results/:studentId', async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const totalMarksRecord = await TotalMarks.findOne({ studentId });

        if (!totalMarksRecord) {
            return res.status(404).json({ message: 'Student results not found' });
        }

        res.status(200).json(totalMarksRecord); // This will include the domain name
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving student results' });
    }
});

module.exports = router;