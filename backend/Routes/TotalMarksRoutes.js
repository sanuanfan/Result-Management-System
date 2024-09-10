const express = require('express');
const router = express.Router();
const TotalMarks = require('../model/DashboardModel');
const Student = require('../model/StudentModel');
const Attendance = require('../model/AttendanceModel');
const ProjectReview = require('../model/ReviewModel');
const Assessment = require('../model/AssessmentModel');
const Submission = require('../model/SubmissionModel');
const LinkedIn = require('../model/LinkedInModel');

// Function to calculate and store total marks for each student
async function calculateAndStoreTotalMarks() {
    try {
        // Aggregate data for Assessments
        const resultAssessment = await Assessment.aggregate([
            {
                $group: {
                    _id: "$studentId", 
                    averageScore: { $avg: "$score" },
                    studentName: { $first: "$studentName" }
                }
            },
            {
                $project: {
                    _id: 0,
                    studentId: "$_id",
                    studentName: 1,
                    averageScore: 1
                }
            }
        ]);

        // Aggregate data for Project Review
        const resultReview = await ProjectReview.aggregate([
            {
                $group: {
                    _id: "$studentId", 
                    averageScore: { $avg: "$projectMark" }, 
                    studentName: { $first: "$studentName" }
                }
            },
            {
                $project: {
                    _id: 0,
                    studentId: "$_id",
                    studentName: 1,
                    averageScore: 1
                }
            }
        ]);

        // Aggregate data for Submission
        const resultSubmission = await Submission.aggregate([
            {
                $group: {
                    _id: "$studentId", 
                    averageScore: { $avg: "$marks" }, 
                    studentName: { $first: "$studentName" }
                }
            },
            {
                $project: {
                    _id: 0,
                    studentId: "$_id",
                    studentName: 1,
                    averageScore: 1
                }
            }
        ]);

        // Aggregate data for LinkedIn
        const resultLinkedin = await LinkedIn.aggregate([
            {
                $group: {
                    _id: "$studentId", 
                    averageScore: { $avg: "$postScore" }, 
                    studentName: { $first: "$studentName" }
                }
            },
            {
                $project: {
                    _id: 0,
                    studentId: "$_id",
                    studentName: 1,
                    averageScore: 1
                }
            }
        ]);

        // Initialize a map to collect scores for each studentId
        const studentScoresMap = {};

        // Helper function to add scores to the map
        function addScoresToMap(map, results, key) {
            results.forEach(({ studentId, studentName, averageScore }) => {
                if (!map[studentId]) {
                    map[studentId] = {
                        studentName: studentName,
                        scores: {},
                    };
                }
                map[studentId].scores[key] = averageScore;
            });
        }

        // Add scores from each of the results to the map with appropriate keys
        addScoresToMap(studentScoresMap, resultReview, 'review');
        addScoresToMap(studentScoresMap, resultSubmission, 'submission');
        addScoresToMap(studentScoresMap, resultLinkedin, 'linkedin');

        // Calculate the final project score for each studentId
        const projectScores = Object.entries(studentScoresMap).map(([studentId, { studentName, scores }]) => {
            const totalScore = (scores.review || 0) + (scores.submission || 0) + (scores.linkedin || 0);
            const projectScore = (totalScore / 3).toFixed(1); 

            return {
                studentId,
                studentName,
                projectScore: parseFloat(projectScore)
            };
        });

        // Calculate attendance percentages
        const attendanceResults = await Attendance.aggregate([
            {
                $group: {
                    _id: "$studentId",
                    studentName: { $first: "$studentName" },
                    totalAttendance: { $sum: 1 },
                    presentCount: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "Present"] }, 1, 0]
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    studentId: "$_id",
                    studentName: 1,
                    presentPercentage: {
                        $multiply: [{ $divide: ["$presentCount", "$totalAttendance"] }, 100]
                    }
                }
            }
        ]);

        // Map attendance results
        const attendanceMap = attendanceResults.reduce((acc, { studentId, studentName, presentPercentage }) => {
            acc[studentId] = { studentName, presentPercentage };
            return acc;
        }, {});

        // Fetch all students to ensure they are included
        const allStudents = await Student.find();

        // Merge all data and save to the TotalMarks model
        for (const student of allStudents) {
            const studentId = student.studentId;
            const studentName = student.studentName;
            const domainName = student.domainName || "Unknown";

            const attendance = attendanceMap[studentId] || { presentPercentage: 0 };
            const assessment = resultAssessment.find(a => a.studentId === studentId) || { averageScore: 0 };
            const projectScore = (projectScores.find(p => p.studentId === studentId) || { projectScore: 0 }).projectScore;
            const review = resultReview.find(a => a.studentId === studentId) || { averageScore: 0 };
            const submission = resultSubmission.find(a => a.studentId === studentId) || { averageScore: 0 };
            const linkedin = resultLinkedin.find(a => a.studentId === studentId) || { averageScore: 0 };




            const totalMarks = {
                studentName: studentName,
                studentId: studentId,
                domainName: domainName,
                totalAttendanceMarks: parseFloat(attendance.presentPercentage.toFixed(1)),
                totalAssessmentMarks: parseFloat(assessment.averageScore.toFixed(1)),
                totalProjectMarks: parseFloat(projectScore.toFixed(1)),
                totalReview: parseFloat(review.averageScore.toFixed(1)),
                totalSubmission: parseFloat(submission.averageScore.toFixed(1)),
                totalLinkedin: parseFloat(linkedin.averageScore.toFixed(1)),
                totalMarks: parseFloat(((attendance.presentPercentage + assessment.averageScore + projectScore)/3).toFixed(1))
            };

            // Insert or update the record in the TotalMarks collection
            await TotalMarks.findOneAndUpdate(
                { studentId: studentId }, 
                totalMarks,
                { upsert: true, new: true }
            );
        }

        console.log("Total marks calculated and stored successfully.");
    } catch (error) {
        console.log("Error in calculating and storing total marks:", error);
    }
}

router.get('/calculate-total', async (req, res) => {
    await calculateAndStoreTotalMarks();
    res.status(200).json({ message: 'Total marks calculated and stored.' });
});

// Fetch stored total marks for a student
router.get('/', async (req, res) => {
  try {
    const dashboardRecords = await TotalMarks.find();
    res.json(dashboardRecords);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance data', error });
  }
});

router.get('/search/:studentId',async (req,res)=>{
    try{
        const student = await TotalMarks.findOne({studentId :req.params.studentId})
        if(student){
            console.log('Fetched Student:', student);
            res.json(student)
            
            
        }else{
            res.status(404).json({ message: 'student not found' });

        }
    }catch(error){

    }
})





module.exports = router;
