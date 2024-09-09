import React, { useState, useEffect } from 'react';
import NavBar from '../Navbar';
import '../AdminDashboard/AdminDashboard.css';
import axios from 'axios';
import StudentUpload from './StudentUpload';

function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Hello...");
        
        const response = await axios.get('http://localhost:5000/api/total/calculate-total');
        // setData(response.data);
        // setFilteredData(response.data); // Initialize filtered data
      } catch (err) {
        console.error('Error fetching LinkedIn data:', err);
      }
    };

    fetchData();
  }, []);



  // Fetch dashboard data to the table
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/total');
        setStudents(response.data);
        setFilteredStudents(response.data); // Initialize filtered data
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchDashboardData();
  }, []);


  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter the students based on the search term
    const filtered = students.filter(student =>
      student.studentId.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredStudents(filtered);
  };


  return (
    <div>
      <NavBar activeSection="dashboard">
        <StudentUpload />
        <div className="main-div">
          <p>List Of Students</p>
          <div className='search-bar'>
          <input
            type="text"
            placeholder='Search by ID'
            name='studentId'
            value={searchTerm}
            onChange={handleSearchChange}
          />
            <i className='bx bx-search-alt' id='search-icon'></i>
          </div>
          <div className="tab">
            <table className="student-table">
              <thead>
                <tr>
                  <th>Sl No</th>
                  <th>Student Name</th>
                  <th>Student ID</th>
                  <th>Domain Name</th>
                  <th>Attendance</th>
                  <th>Assessment</th>
                  <th>Project</th>
                  <th>Total Score</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length>0 ?(
                  filteredStudents.map((student,index)=>(
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{student.studentName}</td>
                  <td>{student.studentId}</td>
                  <td>{student.domainName}</td>
                  <td>{student.totalAttendanceMarks}</td>
                  <td>{student.totalAssessmentMarks}</td>
                  <td>{student.totalProjectMarks}</td>
                  <td>{student.totalMarks}</td>
                </tr>
                  ))
                   ):(
                    <tr>
                    <td colSpan="6" className="no-match">No match found</td>
                  </tr>
                   ) }
              </tbody>
            </table>
          </div>
        </div>
      </NavBar>
    </div>
  );
}

export default AdminDashboard;
