import React, { useState,useEffect } from 'react';
import '../Attendance/Attendance.css';
import NavBar from '../Navbar';
import AttendanceUpload from './AttendanceUpload';
import axios from 'axios';


function Attendance() {
  const [students, setStudents] = useState([]);

  const [editingRow, setEditingRow] = useState(null);
  const [status, setStatus] = useState('');


  
// Fetch attendance data from the backend
useEffect(() => {
  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/attendances'); // Ensure this matches your backend route
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  fetchAttendanceData();
}, []);




  const handleEditClick = (index) => {
    setEditingRow(index);
    setStatus(students[index].status);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleConfirmClick = async (index) => {
    const updatedStudent = { ...students[index], status };
    
    try {
      // Send a PUT request to update the status in the database
      await axios.put(`http://localhost:5000/api/attendances/${updatedStudent._id}`, { status });

      // Update the state to reflect the change
      const updatedStudents = students.map((student, i) =>
        i === index ? updatedStudent : student
      );
      setStudents(updatedStudents);
      setEditingRow(null);
    } catch (error) {
      console.error('Error updating attendance status:', error);
    }
  };

  return (
    <div>
      <NavBar activeSection="attendance" />
                  <AttendanceUpload />
                 
      <div className="container-main">
        <p>Attendance Marks</p>
        <div className='search-bar'>
            <input type="text" placeholder='Search by ID' name='studentId' />
            <i className='bx bx-search-alt' id='search-icon'></i>
          </div>
        <div className="tab">
        <table className="attendance-table">
            <thead>
              <tr>
                <th>Sl No </th>
                <th>Student Name</th>
                <th>Student Id</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td>{index +1}</td>
                  <td>{student.studentName}</td>
                  <td>{student.studentId}</td>
                  <td>{new Date(student.Date).toLocaleDateString()}</td>
                  <td>{student.status}</td>
                  <td className="centre-btn">
                    <button
                      className="edit-btn"
                      onClick={() => handleEditClick(index)}
                    >
                      Edit
                    </button>
                    {editingRow === index && (
                      <div className="edit-form">
                        <label>
                          <input
                            type="radio"
                            value="Present"
                            checked={status === 'Present'}
                            onChange={handleStatusChange}
                          />
                          Present
                        </label>
                        <label>
                          <input
                            type="radio"
                            value="Absent"
                            checked={status === 'Absent'}
                            onChange={handleStatusChange}
                          />
                          Absent
                        </label>
                        <button
                          className="confirm-btn"
                          onClick={() => handleConfirmClick(index)}
                        >
                          Confirm
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Attendance;
