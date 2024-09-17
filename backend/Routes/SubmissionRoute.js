const express = require('express');
const multer = require('multer');
const csvtojson = require('csvtojson');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const submissionModel = require('../model/SubmissionModel');
const router = express.Router();

// const upload = multer({ dest: 'uploads/' });


const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
      try {
        const destDir = "./uploads/";
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }
        cb(null, destDir);
      } catch (error) {
        console.error("Error in destination:", error);
        cb(error, "./uploads/");
      }
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    },
  });
  const upload = multer({ storage: storage });

const excelToCsv = (filePath) =>{
    return new Promise((resolve,reject)=>{
        try{
            const workbook = xlsx.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const csvData = xlsx.utils.sheet_to_csv(worksheet);


            const csvFilePath = `${filePath}.csv`;
            fs.writeFileSync(csvFilePath,csvData);
            resolve(csvFilePath);
        }catch(error){
            reject(error)
        }
    });
};


//Check for Existing Records
// const processRecords = async (records) =>{
//     for(const record of records){
//         const { studentName, studentId, projectTitle, submitDate, marks, comments } = record;

//         const existingRecord = await submissionModel.findOne({
//             studentName,
//             studentId,
//             projectTitle,
           
//         });

//         if(existingRecord){
//             await submissionModel.updateOne(
//                 {studentName, studentId, projectTitle},
//                 {$set:{marks:marks, comments:comments,submitDate:submitDate}}
                
//             );
//         }else{
//             await submissionModel.create(record);
//         }
//     }
// };



// Function to process and merge/skip duplicates
const processRecords = async (records) => {
    let mismatchFlag = false;
    for (const record of records) {
        const { studentName, studentId, projectTitle, submitDate, marks, comments } = record;  
      // Find existing record with the same studentId
      const existingRecordWithSameId = await submissionModel.findOne({ studentId });
  
      // If a record with the same studentId exists but the names don't match, raise an alert
      if (existingRecordWithSameId && existingRecordWithSameId.studentName !== studentName) {
        console.log(`Mismatch for studentId: ${studentId}. Name in records: ${existingRecordWithSameId.studentName}, Name in upload: ${studentName}`);
        // throw new Error(`Mismatch for studentId: ${studentId}. Expected name: ${existingRecordWithSameId.studentName}, but got: ${studentName}`);
        mismatchFlag = true; // Set the mismatch flag
        continue;
      }
  
      // Find if there's an existing record with the same studentId, studentName, and projectTitle
      const existingRecord = await submissionModel.findOne({
        studentId,
        studentName,
        projectTitle
      });
  
      if (existingRecord) {
        // Update the existing record (merge)
        await submissionModel.updateOne(
          { studentId, studentName, projectTitle },
          { $set: { marks, comments,  submitDate } }
        );
      } else {
        // Insert new record
        await submissionModel.create(record);
      }
    }
    return mismatchFlag;
  };
  





router.post('/upload', upload.single('file'), async (req, res) => {
    const filePath = req.file.path;
    const fileExtension = path.extname(req.file.originalname).toLowerCase();
    let csvFilePath = filePath;

    try {
        // Check if the file is an Excel file (based on extension)
        if (['.xls', '.xlsx'].includes(fileExtension)) {
            // Convert Excel to CSV
            csvFilePath = await excelToCsv(filePath);
        }

        // Convert CSV to JSON
        const records = await csvtojson().fromFile(csvFilePath);

        // Process and merge/skip duplicates
       const mismatchFlag = await processRecords(records);

        res.status(200).json({ message: 'File uploaded and data processed successfully',mismatch: mismatchFlag   });

    } catch (err) {
        res.status(500).json({ message: 'Error processing file', error: err });
    } finally {
        fs.unlinkSync(filePath); // Delete the uploaded file
        if (csvFilePath !== filePath) {
            fs.unlinkSync(csvFilePath); // Delete the temporary CSV file
        }
    } 
});


// GET route to fetch all submission data
router.get('/', async (req, res) => {
    try {
        const submissionRecords = await submissionModel.find();
        res.status(200).json(submissionRecords);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching assessments', error });
    }
});



// PUT route to update an assessment by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, projectTitle, submitDate, marks, comments } = req.body;

    try {
        const updateSubmission = await submissionModel.findByIdAndUpdate(id, {
            studentName: name,
            projectTitle,
            submitDate,
            marks,
            comments
        }, { new: true });

        if (!updateSubmission) {
            return res.status(404).json({ message: 'Assessment not found' });
        }

        res.status(200).json(updateSubmission);
    } catch (error) {
        res.status(500).json({ message: 'Error updating assessment', error });
    }
});

module.exports = router;
