const express = require('express');
const multer = require('multer');
const csvtojson = require('csvtojson');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const attendanceModel = require('../model/AttendanceModel');
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
const processRecords = async (records) => {
  for (const record of records) {
    const { studentName, studentId, Date, status } = record;

    // Find existing records
    const existingRecord = await attendanceModel.findOne({
      studentName,
      studentId,
      Date
    });

    if (existingRecord) {
      // Update the existing record (merge)
      await attendanceModel.updateOne(
        { studentName, studentId, Date },
        { $set: { status } } // Adjust this if you want to update other fields as well
      );
    } else {
      // Insert new record
      await attendanceModel.create(record);
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
    await processRecords(records);

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

// GET route to fetch all attendance data
router.get('/', async (req, res) => {
  try {
    const attendanceRecords = await attendanceModel.find();
    res.json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance data', error });
  }
});

//Update the Attendance Status
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedAttendance = await attendanceModel.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedAttendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    res.json(updatedAttendance);
  } catch (error) {
    res.status(500).json({ message: 'Error updating attendance status', error });
  }
});



module.exports = router;
