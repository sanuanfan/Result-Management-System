import React, { useState, useEffect } from 'react';
import '../Attendance/Attendance.css';
import NavBar from '../Navbar';
import AttendanceUpload from './AttendanceUpload';
import axios from 'axios';

function Attendance() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [status, setStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch attendance data from the backend
  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/attendances');
        setStudents(response.data);
        setFilteredStudents(response.data); // Initialize filtered data
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchAttendanceData();
  }, []);

  const handleEditClick = (index) => {
    setEditingRow(index);
    setStatus(filteredStudents[index].status);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleConfirmClick = async (index) => {
    const updatedStudent = { ...filteredStudents[index], status };

    try {
      await axios.put(`http://localhost:5000/api/attendances/${updatedStudent._id}`, { status });

      const updatedStudents = students.map((student) =>
        student._id === updatedStudent._id ? updatedStudent : student
      );
      setStudents(updatedStudents);
      setFilteredStudents(updatedStudents);
      setEditingRow(null);
    } catch (error) {
      console.error('Error updating attendance status:', error);
    }
  };

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
      <NavBar activeSection="attendance" />
      <AttendanceUpload />

      <div className="container-main">
        <p>Attendance Marks</p>
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
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Student Name</th>
                <th>Student Id</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
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
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-match">No match found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Attendance;
