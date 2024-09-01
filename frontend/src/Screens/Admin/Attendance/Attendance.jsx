import React, { useState } from 'react';
import '../Attendance/Attendance.css';
import NavBar from '../Navbar';

function Attendance() {
  const [students, setStudents] = useState([
    { name: 'John Doe', id: 1011, date: '28-08-2024', status: 'Absent' },
    { name: 'Jane Smith', id: 1012, date: '28-08-2024', status: 'Absent' },
    { name: 'Michael Johnson', id: 1013, date: '28-08-2024', status: 'Absent' },
    { name: 'Emily Davis', id: 1014, date: '28-08-2024', status: 'Absent' },
    { name: 'William Brown', id: 1015, date: '28-08-2024', status: 'Absent' },
    { name: 'Linda Wilson', id: 1016, date: '28-08-2024', status: 'Absent' },
    { name: 'James Miller', id: 1017, date: '28-08-2024', status: 'Absent' },
    { name: 'Olivia Taylor', id: 1018, date: '28-08-2024', status: 'Absent' },
  ]);

  const [editingRow, setEditingRow] = useState(null);
  const [status, setStatus] = useState('');

  const handleEditClick = (index) => {
    setEditingRow(index);
    setStatus(students[index].status);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleConfirmClick = (index) => {
    const updatedStudents = students.map((student, i) => 
      i === index ? { ...student, status } : student
    );
    setStudents(updatedStudents);
    setEditingRow(null);
  };

  return (
    <div>
      <NavBar activeSection="attendance" />
      <div className="container-main">
        <p>Attendance Marks</p>
        <div className="tab">
          <table className='attendance-table'>
            <thead>
              <tr>
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
                  <td>{student.name}</td>
                  <td>{student.id}</td>
                  <td>{student.date}</td>
                  <td>{student.status}</td>
                  <td className='centre-btn'>
                    <button 
                      className='edit-btn' 
                      onClick={() => handleEditClick(index)}>
                      <i className='bx bxs-edit-alt'></i>Edit
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
                          className='confirm-btn' 
                          onClick={() => handleConfirmClick(index)}>
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
