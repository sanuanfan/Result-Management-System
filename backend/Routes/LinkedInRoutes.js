const express = require('express');
const multer = require('multer');
const csvtojson = require('csvtojson');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const linkedInModel = require('../model/LinkedInModel');
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
  let mismatchFlag = false;

  for (const record of records) {
    const { studentName, studentId, projectTitle, postDate, postScore, linkedInLink, remarks } = record;

    // Parse the postDate and adjust it to IST
    const dateObject = new Date(postDate);

    // Converting the time to Indian Standard Time (IST)
    const offsetIST = 330; // IST is UTC +5:30
    const ISTDate = new Date(dateObject.getTime() + (offsetIST * 60 * 1000));

    // Format the date in dd-mm-yyyy (for logging/display purposes)
    const formattedPostDate = `${ISTDate.getDate().toString().padStart(2, '0')}-${(ISTDate.getMonth() + 1).toString().padStart(2, '0')}-${ISTDate.getFullYear()}`;
    
    // Log the original and formatted postDate for debugging
    console.log(`Original postDate: ${postDate}`);
    console.log(`Formatted Post Date in IST (dd-mm-yyyy): ${formattedPostDate}`);

    // Find existing record with the same studentId
    const existingRecordWithSameId = await linkedInModel.findOne({ studentId });

    // If a record with the same studentId exists but the names don't match, raise an alert
    if (existingRecordWithSameId && existingRecordWithSameId.studentName !== studentName) {
      console.log(`Mismatch for studentId: ${studentId}. Name in records: ${existingRecordWithSameId.studentName}, Name in upload: ${studentName}`);
      mismatchFlag = true; // Set the mismatch flag
      continue;
    }

    // Find if there's an existing record with the same studentId, studentName, and projectTitle
    const existingRecord = await linkedInModel.findOne({
      studentId,
      studentName,
      projectTitle
    });

    if (existingRecord) {
      // Update the existing record (merge) and store the ISTDate (as a Date object)
      await linkedInModel.updateOne(
        { studentId, studentName, projectTitle },
        { $set: { postDate: ISTDate, postScore, linkedInLink, remarks } }  // Use ISTDate, not formattedPostDate
      );
    } else {
      // Insert new record and store the ISTDate (as a Date object)
      await linkedInModel.create({
        studentName,
        studentId,
        projectTitle,
        postDate: ISTDate,  // Store the ISTDate (Date object), not the formatted string
        postScore,
        linkedInLink,
        remarks
      });
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
    const mismatchFlag = await processLinkedInRecords(records);

    res.status(200).json({ message: 'File uploaded and data processed successfully',mismatch: mismatchFlag  });
  } catch (err) {
    res.status(500).json({ message: 'Error processing file', error: err.message });
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

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { projectTitle, postDate, postScore, linkedInLink, remarks, studentName } = req.body;

  try {
    // Check if the document with the same studentId and projectTitle exists
    const updatedLinkedIn = await linkedInModel.findByIdAndUpdate(id,{
      studentName,
      projectTitle,
      postDate,
      postScore,
      linkedInLink,
      remarks
    },{ new: true });

    if (!updatedLinkedIn) {
      return res.status(404).json({ message: 'No matching LinkedIn post found for this studentId.' });
    }

    // Proceed to update the specific record
    // const updatedLinkedIn = await linkedInModel.findOneAndUpdate(
    //   { studentId: studentId , projectTitle:projectTitle}, // Use both studentId and projectTitle to find the exact document
    //   { postDate, postScore, linkedInLink, remarks, studentName },
    //   
    // );

    res.json(updatedLinkedIn);
  } catch (error) {
    console.error('Error updating LinkedIn data:', error.message);
    res.status(500).json({ message: 'Error updating LinkedIn data', error: error.message });
  }
});





module.exports = router;
