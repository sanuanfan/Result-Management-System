import React, { useState } from 'react';
import '../Student/student.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';

function HomeStudent() {
  const [studentId, setStudentId] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [grandTotal, setGrandTotal] = useState(0);

  // Static data array
  const data = [
    { category: "Attendance", cutOff: 40, weightage: 100 },
    { category: "Project Review", cutOff: 40, weightage: 100 },
    { category: "Assessment", cutOff: 40, weightage: 100 },
    { category: "Project Submission", cutOff: 40, weightage: 100 },
    { category: "LinkedIn Post", cutOff: 40, weightage: 100 },
  ];

  // Function to get remarks based on marks
  const getRemarks = (marksObtained, cutOff) => {
    if (marksObtained >= 85) {
      return "Excellent";
    } else if (marksObtained >= 70) {
      return "Good";
    } else if (marksObtained >= cutOff) {
      return "Need improvement";
    } else {
      return "Fail";
    }
  };

  const fetchStudentData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/total/search/${studentId}`);
      const studentDetails = response.data;

      // Update studentData with the fetched details
      setStudentData(studentDetails);

      // Calculate grand total based on the fetched data
      const total = studentDetails.totalMarks; // Use totalMarks as grand total
      setGrandTotal(total);

      console.log(studentDetails);
      console.log("File fetched");
      console.log(studentId);
    } catch (err) {
      console.error('Error fetching certificate data', err);
      alert('Certificate not found');
      console.log(studentId);
    }
  };

  const generateResult = () => {
    const {
      studentName,
      studentId,
      domainName,
      totalAssessmentMarks,
      totalAttendanceMarks,
      totalLinkedin,
      totalReview,
      totalSubmission,
      totalMarks,
    } = studentData;

    // Create a new jsPDF document
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'A4',
    });

    // Set the title of the document
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Student Result Report', 220, 40); // Centered title

    // Add student details section with a border
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(`Student Name: ${studentName}`, 40, 80);
    doc.text(`Student ID: ${studentId}`, 40, 100);
    doc.text(`Domain: ${domainName}`, 40, 120);

    // Add a line below the student details
    doc.line(40, 130, 550, 130); // Draw a horizontal line

    // Add section for marks
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Marks List', 40, 160);

    // Define the table data for marks
    const tableColumn = ['Criteria', 'Marks'];
    const tableRows = [
      ['Attendance', totalAttendanceMarks],
      ['Assessment', totalAssessmentMarks],
      ['Review', totalReview],
      ['Submission', totalSubmission],
      ['LinkedIn Post', totalLinkedin],
      ['Total Marks', totalMarks], // Last row is Total Marks
    ];

    // Add the table to the PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 180,
      theme: 'grid',
      styles: {
        fontSize: 12,
        cellPadding: 10,
      },
      headStyles: {
        fillColor: [70, 148, 245], // Custom header color (teal)
        textColor: [255, 255, 255], // White text
      },
      bodyStyles: {
        valign: 'middle', // Vertically center the text
        // fillColor:[225, 232, 226]
      },
      didParseCell: function (data) {
        // Highlight the "Total Marks" row
        if (data.row.index === tableRows.length - 1) { // If it's the last row (Total Marks)
          data.cell.styles.fontStyle = 'bold'; // Bold text
          // data.cell.styles.fillColor = [92, 176, 109]; // Light orange background
          data.cell.styles.textColor = [0, 0, 0]; // Black text
        }
      },
    });

    // Footer for signature or remarks
    doc.setFontSize(12);
    doc.text('Generated by: Result Management Team', 40, doc.internal.pageSize.height - 40);
    doc.text('Date: ' + new Date().toLocaleDateString(), 450, doc.internal.pageSize.height - 40);

    // Save the PDF
    doc.save(`${studentName}_MarkList.pdf`);
  };


  return (
    <div className='main-container'>
      <div className="nav-bar">
        <div className='logos'></div>
       { studentData && <div className="download" onClick={generateResult}>Download</div>}
      </div>

      <div className="sub-container">
        <div className="mini-container">
          <h3>Mark Display</h3>
          <div className='search'>
            <input
              type="text"
              placeholder='Enter Student ID'
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
            <i className='bx bx-search-alt' id='search-icon'></i>
            <button className='search-btn' onClick={fetchStudentData}>Search</button>
          </div>

          {/* Conditionally render the student details */}
          {studentData && (
            <div className="details-student">
              <p>Student Id: {studentData.studentId}</p>
              <p>Student Name: {studentData.studentName}</p>
              <p>Domain: {studentData.domainName}</p>
            </div>
          )}

          <div className="table-container">
            {/* <div className="table-left"> */}
              <table className="result-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Cut-Off</th>
                    <th>Max-Mark</th>
                    <th>Marks Obtained</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => {
                    let marksObtained;
                    switch (row.category) {
                      case "Attendance":
                        marksObtained = studentData?.totalAttendanceMarks || 0;
                        break;
                      case "Project Review":
                        marksObtained = studentData?.totalReview || 0;
                        break;
                      case "Assessment":
                        marksObtained = studentData?.totalAssessmentMarks || 0;
                        break;
                      case "Project Submission":
                        marksObtained = studentData?.totalSubmission || 0;
                        break;
                      case "LinkedIn Post":
                        marksObtained = studentData?.totalLinkedin || 0;
                        break;
                      default:
                        marksObtained = 0;
                    }
                    return (
                      <tr key={index}>
                        <td>{row.category}</td>
                        <td>{row.cutOff}</td>
                        <td>{row.weightage}</td>
                        <td>{studentData?marksObtained:'--'}</td>
                        <td>{studentData?getRemarks(marksObtained, row.cutOff):'--'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            {/* </div> */}
          </div>

          <div className="mark">
            <h3>Grand Total: {grandTotal}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeStudent;
