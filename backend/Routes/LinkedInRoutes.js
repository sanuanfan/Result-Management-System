const express = require('express');
const multer = require('multer');
const csvtojson = require('csvtojson');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const linkedInModel = require('../model/LinkedInModel');
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

// Function to process and merge/skip duplicates
const processLinkedInRecords = async (records) => {
  for (const record of records) {
    const { studentName, studentId, projectTitle, postDate, postScore, linkedInLink, remarks } = record;

    // Find existing records
    const existingRecord = await linkedInModel.findOne({
      studentName,
      studentId,
      projectTitle // Check for duplicate project title
    });

    if (existingRecord) {
      // Update the existing record (merge)
      await linkedInModel.updateOne(
        { studentName, studentId, projectTitle },
        { $set: { postDate, postScore, linkedInLink, remarks } }
      );
    } else {
      // Insert new record
      await linkedInModel.create(record);
    }
  }
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
    await processLinkedInRecords(records);

    res.status(200).json({ message: 'File uploaded and data processed successfully' });

  } catch (err) {
    res.status(500).json({ message: 'Error processing file', error: err });
  } finally {
    fs.unlinkSync(filePath); // Delete the uploaded file
    if (csvFilePath !== filePath) {
      fs.unlinkSync(csvFilePath); // Delete the temporary CSV file
    }
  }
});

// GET route to fetch all LinkedIn data
router.get('/', async (req, res) => {
  try {
    const linkedInRecords = await linkedInModel.find();
    res.json(linkedInRecords);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching LinkedIn data', error });
  }
});

// Update LinkedIn data


router.put('/:studentId', async (req, res) => {
  const { studentId } = req.params; // The studentId in the URL
  const {
    projectTitle,
    postDate,
    postScore,
    linkedInLink,
    remarks,
    studentName
  } = req.body;

  try {
    const updatedLinkedIn = await linkedInModel.findOneAndUpdate(
      { studentId: studentId }, // Search by studentId instead of _id
      { projectTitle, postDate, postScore, linkedInLink, remarks, studentName },
      { new: true }
    );

    if (!updatedLinkedIn) {
      return res.status(404).json({ message: 'LinkedIn post not found' });
    }

    res.json(updatedLinkedIn);
  } catch (error) {
    console.error('Error updating LinkedIn data:', error.message);
    res.status(500).json({ message: 'Error updating LinkedIn data', error: error.message });
  }
});


module.exports = router;
