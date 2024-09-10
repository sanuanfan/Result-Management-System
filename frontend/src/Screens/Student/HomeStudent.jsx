import React, { useState } from 'react';
import '../Student/student.css';
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
      const response = await axios.get(`http://localhost:5000/api/total/search/${studentId}`);
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

  return (
    <div className='main-container'>
      <div className="nav-bar">
        <div className='logos'></div>
        <div className="download">Download</div>
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
            <div className="table-left">
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
            </div>
          </div>

          <div className="review"></div>
          <div className="mark">
            <h3>Grand Total: {grandTotal}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeStudent;
