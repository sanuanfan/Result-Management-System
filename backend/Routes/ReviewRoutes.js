const express = require('express');
const multer = require('multer');
const csvtojson = require('csvtojson');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const reviewModel = require('../model/ReviewModel'); // Assuming the model is named ReviewModel
const LinkedInModel = require('../model/LinkedInModel');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

// Utility function to convert Excel to CSV
const excelToCsv = (filePath) => {
  return new Promise((resolve, reject) => {
    try {
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0]; // Get the first sheet
      const worksheet = workbook.Sheets[sheetName];
      const csvData = xlsx.utils.sheet_to_csv(worksheet);

      // Create a temporary CSV file
      const csvFilePath = `${filePath}.csv`;
      fs.writeFileSync(csvFilePath, csvData);
      resolve(csvFilePath);
    } catch (error) {
      reject(error);
    }
  });
};

// Function to process and merge/skip duplicates for Review records
const processReviewRecords = async (records) => {
  for (const record of records) {
    const { studentName, studentId, projectName, projectMark, remarks } = record;

    // Check for existing records based on studentId and projectName
    const existingRecord = await reviewModel.findOne({
      studentId,
      projectName // Check for duplicate projectName for the same studentId
    });

    if (existingRecord) {
      // If record exists, update it with the new data
      await reviewModel.updateOne(
        { studentId, projectName },
        { $set: { studentName, projectMark, remarks } }
      );
    } else {
      // If no duplicate is found, insert the new record
      await reviewModel.create(record);
    }
  }
};

// Route to upload review data
router.post('/upload', upload.single('file'), async (req, res) => {
  const filePath = req.file.path;
  const fileExtension = path.extname(req.file.originalname).toLowerCase();
  let csvFilePath = filePath;

  try {
    // Convert Excel to CSV if necessary
    if (['.xls', '.xlsx'].includes(fileExtension)) {
      csvFilePath = await excelToCsv(filePath);
    }

    // Convert CSV to JSON
    const records = await csvtojson().fromFile(csvFilePath);

    // Process records (merge/insert data)
    await processReviewRecords(records);

    res.status(200).json({ message: 'Review data uploaded and processed successfully' });

  } catch (err) {
    res.status(500).json({ message: 'Error processing file', error: err });
  } finally {
    fs.unlinkSync(filePath); // Delete the uploaded file
    if (csvFilePath !== filePath) {
      fs.unlinkSync(csvFilePath); // Delete the temporary CSV file
    }
  }
});

router.get('/', async (req, res) => {
    try {
      const reviewRecords = await reviewModel.find();
      res.json(reviewRecords);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching Review data', error });
    }
  });

  // updating 

  // Backend API for Review



  // PUT route to update an assessment by ID
router.put('/:studentId', async (req, res) => {
  const { id } = req.params;
  const { projectName, projectMark, remarks,studentName } = req.body;

  try {
      const updatedAssessment = await reviewModel.findByIdAndUpdate(id, {
          studentName,
          projectName,
          projectMark,
          remarks
      }, { new: true });

      if (!updatedAssessment) {
          return res.status(404).json({ message: 'Assessment not found' });
      }

      res.status(200).json(updatedAssessment);
  } catch (error) {
      console.error('Error updating assessment:', error); // Log the error
      res.status(500).json({ message: 'Error updating assessment', error: error.message });
}
});
  
  

module.exports = router;
