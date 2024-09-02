import React, { useState } from 'react';
import NavBar from '../Navbar';
import './Submission.css';
import EditSubmissionForm from './EditSubissionForm';

function Submission() {
  const [data, setData] = useState([
    { id: 1, studentName: 'Alice Johnson', studentId: '3001', projectTitle: 'AI Chatbot', submissionDate: '2024-08-10', marks: 90, comments: 'Excellent implementation and functionality' },
    { id: 2, studentName: 'Bob Smith', studentId: '3002', projectTitle: 'Data Visualization Tool', submissionDate: '2024-08-12', marks: 85, comments: 'Good use of libraries and clean UI' },
    // Add more rows as needed
  ]);

  const [editingRow, setEditingRow] = useState(null);
  const [formData, setFormData] = useState({name:'', projectTitle: '', submissionDate: '', marks: '', comments: '' });
  const [error, setError] = useState('');

  const handleEditClick = (row) => {
    setEditingRow(row);
    setFormData({ 
      name:row.studentName,
      projectTitle: row.projectTitle, 
      submissionDate: row.submissionDate, 
      marks: row.marks, 
      comments: row.comments 
    });
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleConfirmClick = () => {
    const { projectTitle, submissionDate, marks, comments } = formData;

    // Validate input
    if (!projectTitle || !submissionDate || marks === '' || !comments) {
      setError('All fields are required.');
      return;
    }
    if (marks < 0 || marks > 100) {
      setError('Marks must be between 0 and 100.');
      return;
    }

    setData(data.map(row => row.id === editingRow.id ? { ...row, ...formData } : row));
    setEditingRow(null);
    setError('');
  };

  const handleCloseModal = () => {
    setEditingRow(null);
    setError('');
  };

  return (
    <div>
      <NavBar activeSection="submission">
        <div className="submission-main">
          <p>Project Submission Marks</p>
          <div className="tab">
            <table className='submission-table'>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Student Id</th>
                  <th>Project Title</th>
                  <th>Submission Date</th>
                  <th>Marks Awarded</th>
                  <th>Comments</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map(row => (
                  <tr key={row.id}>
                    <td>{row.studentName}</td>
                    <td>{row.studentId}</td>
                    <td>{row.projectTitle}</td>
                    <td>{row.submissionDate}</td>
                    <td>{row.marks}</td>
                    <td>{row.comments}</td>
                    <td>
                      <button className='edit-btn' onClick={() => handleEditClick(row)}>Edit</button>
                      {editingRow && editingRow.id === row.id && (
                        <EditSubmissionForm
                          isOpen={true}
                          onClose={handleCloseModal}
                          formData={formData}
                          onInputChange={handleInputChange}
                          onConfirmClick={handleConfirmClick}
                          error={error}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </NavBar>
    </div>
  );
}

export default Submission;
