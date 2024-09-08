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


    try {


        const result = await Assessment.aggregate([
            {
              $group: {
                _id: "$studentId", // Group by studentId
                averageScore: { $avg: "$score" }, // Calculate average score
                studentName: { $first: "$studentName" } // Include studentName
              }
            },
            {
              $project: {
                _id: 0, // Exclude the `_id` field
                studentId: "$_id", // Renaming the `_id` to studentId
                studentName: 1,
                averageScore: 1
              }
            }
          ]);
      
        const attendanceResult = await Attendance.aggregate([{
            $limit:1
            
        }])
        if (attendanceResult.length > 0) {
            const studentId = attendanceResult[0].studentId; // Extract the studentId from the result
            
            const allRecordsForStudent = await Attendance.aggregate([
                {
                    $match: {
                        studentId: studentId // Use the extracted studentId to find all related records
                    }
                }
            ]);
        
            console.log(allRecordsForStudent.length);

            const RecordsForStudent = await Attendance.aggregate([
                {
                  $group: {
                    _id: "$studentId",
                    presentCount: {
                      $sum: {
                        $cond: [{ $eq: ["$status", "Present"] }, 1, 0]
                      }
                    }
                  }
                },
                {
                  $project: {
                    _id: 0, // Exclude the _id field if you don't want it in the result
                    studentId: "$_id",
                    presentPercentage: { 
                      $multiply: [
                        { $divide: ["$presentCount", allRecordsForStudent.length] },
                        100
                      ]
                    } // Calculate (presentCount / 3) * 100
                  }
                }
              ]);
              

            console.log(RecordsForStudent);
            


        } else {
            console.log("No records found");
        }
          


          
  
    } catch (error) {
    console.log(error);
    
    }
}

// code to store the calculated scores in the Database

router.get('/calculate-total', async (req, res) => {
    // const { studentId } = req.params;

    console.log('Hello......');
    

    const result = await calculateAndStoreTotalMarks();

    // console.log(calculateAndStoreTotalMarks(result.studentId));
    

    // if (result.success) {
    //     return res.status(200).json({ message: result.message });
    // } else {
    //     return res.status(500).json({ message: result.message });
    // }
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