const express = require('express');
const multer = require('multer');
const csvtojson = require('csvtojson');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const assessmentModel = require('../model/AssessmentModel');
const router = express.Router();

const upload = multer({dest : 'uploads/' })

const excelToCsv = (filePath) =>{
    return new Promise((resolve,reject)=>{
        try{
            const workbook = xlsx.readFile(filePath)
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const csvData = xlsx.utils.sheet_to_csv(worksheet);

            const csvFilePath = `${filePath}.csv`;
            fs.writeFileSync(csvFilePath,csvData);
            resolve(csvFilePath);

        }catch(error){
            reject(error);
        }

    }) ;
};
const processRecords = async(records)=>{
    for (const record of records){
        const {studentName,studentId,Date,assessmentType,score} = record;

        const existingRecord = await assessmentModel.findOne({
            studentName,
            studentId,
            Date,
            assessmentType
        });
        if(existingRecord){
            await assessmentModel.updateOne(
                {studentName,studentId,Date,assessmentType},
                {$set: {score: score}}
            );
        }else{
            await assessmentModel.create(record);
        }
    }
};

router.post('/upload',upload.single('file'),async(req,res)=>{
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
      const assessmentRecords = await assessmentModel.find();
      res.json(assessmentRecords);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching attendance data', error });
    }
  });


  //Update the Attendance Status
  router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, date, assessmentType, score } = req.body;

  try {
    const updatedAssessment = await assessmentModel.findByIdAndUpdate(id, {
      studentName: name,
      Date: date,
      assessmentType,
      score
    }, { new: true });

    if (!updatedAssessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }

    res.json(updatedAssessment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;  

