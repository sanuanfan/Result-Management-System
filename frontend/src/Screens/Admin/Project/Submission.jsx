import React, { useState, useEffect } from 'react';
import NavBar from '../Navbar';
import './Submission.css';
import EditSubmissionForm from './EditSubmissionForm';
import SubmissionUpload from './SubmissionUpload';
import axios from 'axios';

// Helper functions to handle date formatting
const formatDateToDisplay = (date) => {
  const [year, month, day] = date.split('-');
  return `${day}-${month}-${year}`;
};

const formatDateForInput = (date) => {
  const [day, month, year] = date.split('-');
  return `${year}-${month}-${day}`;
};




function Submission() {
  const [data, setData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [formData, setFormData] = useState({ name: '', projectTitle: '', submissionDate: '', marks: '', comments: '' });
  const [error, setError] = useState('');

  // Fetch submission data from the backend
  useEffect(() => {
    const fetchSubmissionData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/submission');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching submission data:', error);
      }
    };

    fetchSubmissionData();
  }, []);

  // Format dates correctly for display and input
  const handleEditClick = (row) => {
    setEditingRow(row);
    // Format the date for input correctly
    const formattedDate = formatDateForInput(row.submitDate);
        setFormData({ 
        name: row.studentName,
        projectTitle: row.projectTitle, 
        submissionDate: formattedDate, 
        marks: row.marks, 
        comments: row.comments 
    });
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({ ...formData, [name]: value });
  };

  const handleConfirmClick = async () => {
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

    try {
        const response = await axios.put(`http://localhost:5000/api/submission/${editingRow._id}`, {
            name: formData.name,
            projectTitle: formData.projectTitle,
            submitDate: submissionDate, // Send the correctly formatted date
            marks: formData.marks,
            comments: formData.comments
        });

        // Update the local state with the response data
        const updatedData = data.map(row => row._id === editingRow._id 
            ? { 
                ...row, 
                projectTitle: formData.projectTitle,
                submitDate: submissionDate,  // Correctly update submitDate property
                marks: formData.marks,
                comments: formData.comments
              } 
            : row
        );
        
        setData(updatedData);
        setEditingRow(null);
        setError('');
    } catch (error) {
        console.error('Error updating submission:', error);
        setError('Failed to update the submission.');
    }
  };

  const handleCloseModal = () => {
    setEditingRow(null);
    setError('');
  };

  return (
    <div>
      <NavBar activeSection="submission">
        <SubmissionUpload />
        <div className="submission-main">
          <p>Project Submission Marks</p>
          <div className='search-bar'>
            <input type="text" placeholder='Search by ID' name='studentId'/>
            <i className='bx bx-search-alt' id='search-icon'></i>
          </div>
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
                {data.map((row, index) => (
                  <tr key={row.studentId || index}>
                    <td>{row.studentName}</td>
                    <td>{row.studentId}</td>
                    <td>{row.projectTitle}</td>
                    <td>{formatDateToDisplay(new Date(row.submitDate).toISOString().split('T')[0])}</td>
                    <td>{row.marks}</td>
                    <td>{row.comments}</td>
                    <td>
                      <button className='edit-btn' onClick={() => handleEditClick(row)}>Edit</button>
                      {editingRow && editingRow.studentId === row.studentId && (
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
