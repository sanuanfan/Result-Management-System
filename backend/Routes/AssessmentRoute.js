const express = require('express');
const multer = require('multer');
const csvtojson = require('csvtojson');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const assessmentModel = require('../model/AssessmentModel');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

// Utility function to convert Excel to CSV
const excelToCsv = (filePath) => {
    return new Promise((resolve, reject) => {
        try {
            const workbook = xlsx.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const csvData = xlsx.utils.sheet_to_csv(worksheet);

            const csvFilePath = `${filePath}.csv`;
            fs.writeFileSync(csvFilePath, csvData);
            resolve(csvFilePath);
        } catch (error) {
            console.error('Error converting Excel to CSV:', error); // Log the error
            reject(error);
        }
    });
};

// Function to process and merge/skip duplicates
const processRecords = async (records) => {
    let mismatchFlag = false;

    for (const record of records) {
        const { studentName, studentId, Date: originalDate, assessmentType, score } = record;

        // Parse the Date and adjust it to IST
        const dateObject = new Date(originalDate);

        // Converting the time to Indian Standard Time (IST)
        const offsetIST = 330; // IST is UTC +5:30
        const ISTDate = new Date(dateObject.getTime() + (offsetIST * 60 * 1000));

        // Format the date in dd-mm-yyyy (for logging/display purposes)
        const formattedDate = `${ISTDate.getDate().toString().padStart(2, '0')}-${(ISTDate.getMonth() + 1).toString().padStart(2, '0')}-${ISTDate.getFullYear()}`;
        
        // Log the original and formatted Date for debugging
        console.log(`Original Date: ${originalDate}`);
        console.log(`Formatted Date in IST (dd-mm-yyyy): ${formattedDate}`);

        // Find existing record with the same studentId
        const existingRecordWithSameId = await assessmentModel.findOne({ studentId });

        // If a record with the same studentId exists but the names don't match, raise an alert
        if (existingRecordWithSameId && existingRecordWithSameId.studentName !== studentName) {
            console.log(`Mismatch for studentId: ${studentId}. Name in records: ${existingRecordWithSameId.studentName}, Name in upload: ${studentName}`);
            mismatchFlag = true; // Set the mismatch flag
            continue;
        }

        // Find if there's an existing record with the same studentId, studentName, ISTDate, and assessmentType
        const existingRecord = await assessmentModel.findOne({
            studentId,
            studentName,
            Date: ISTDate,
            assessmentType
        });

        if (existingRecord) {
            // Update the existing record (merge)
            await assessmentModel.updateOne(
                { studentId, studentName, Date: ISTDate, assessmentType },
                { $set: { score } }
            );
        } else {
            // Insert new record with the IST date
            await assessmentModel.create({
                studentName,
                studentId,
                Date: ISTDate, // Store the IST date
                assessmentType,
                score
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
        const mismatchFlag = await processRecords(records);

        // Send a successful response
        res.status(200).json({ message: 'File uploaded and data processed successfully', mismatch: mismatchFlag });

    } catch (err) {
        console.error('Error processing file:', err); // Log the error
        res.status(500).json({ message: 'Error processing file', error: err.message });
    } finally {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // Delete the uploaded file
        }
        if (csvFilePath !== filePath && fs.existsSync(csvFilePath)) {
            fs.unlinkSync(csvFilePath); // Delete the temporary CSV file
        }
    }
});

// GET route to fetch all assessment data
router.get('/', async (req, res) => {
    try {
        const assessmentRecords = await assessmentModel.find();
        res.status(200).json(assessmentRecords);
    } catch (error) {
        console.error('Error fetching assessments:', error); // Log the error
        res.status(500).json({ message: 'Error fetching assessments', error: error.message });
    }
});

// PUT route to update an assessment by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, Date, assessmentType, score } = req.body;
console.log(name);


    try {
        const updatedAssessment = await assessmentModel.findByIdAndUpdate(id, {
            studentName: name,
            Date,
            assessmentType,
            score
        }, { new: true });
console.log(Date);
console.log(score);


        if (!updatedAssessment) {
            return res.status(404).json({ message: 'Assessment not found' });
        }

        res.status(200).json(updatedAssessment);
    } catch (error) {
        console.error('Error updating assessment:', error); // Log the error
        res.status(500).json({ message: 'Error updating assessment', error: error.message });
    }
});

module.exports = router;
