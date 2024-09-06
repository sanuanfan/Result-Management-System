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
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingRow, setEditingRow] = useState(null);
  const [formData, setFormData] = useState({
    studentName: '',
    studentId: '',
    projectTitle: '',
    submitDate: '',
    marks: '',
    comments: '',
  });
  const [error, setError] = useState('');

  // Fetch submission data on component mount
  useEffect(() => {
    const fetchSubmissionData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/submission');
        setData(response.data);
        setFilteredData(response.data); // Initialize filtered data
      } catch (error) {
        console.error('Error fetching submission data:', error);
      }
    };

    fetchSubmissionData();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter the data based on the search term
    const filtered = data.filter((row) =>
      row.studentId.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleEditClick = (row) => {
    setEditingRow(row);
    setFormData({
      studentName: row.studentName,
      studentId: row.studentId,
      projectTitle: row.projectTitle,
      submitDate: new Date(row.submitDate).toISOString().split('T')[0], // Convert to yyyy-MM-dd
      marks: row.marks,
      comments: row.comments,
    });
    setError('');
  };

  const handleCloseModal = () => {
    setEditingRow(null);
    setError('');
  };

  const handleConfirmClick = async () => {
    const { studentName, projectTitle, submitDate, marks, comments } = formData;

    if (!studentName || !projectTitle || !submitDate || marks === '' || !comments) {
      setError('All fields are required.');
      return;
    }

    if (marks < 0 || marks > 100) {
      setError('Marks must be between 0 and 100.');
      return;
    }

    try {
      const updatedData = {
        studentName,
        projectTitle,
        submitDate, // Already in yyyy-MM-dd format
        marks,
        comments,
      };

      // PUT request to update the specific record
      await axios.put(`http://localhost:5000/api/submission/${editingRow._id}`, updatedData);

      // Update only the specific row in the data list
      const updatedDataList = data.map((item) =>
        item._id === editingRow._id ? { ...item, ...updatedData } : item
      );

      setData(updatedDataList);
      setFilteredData(
        updatedDataList.filter((row) =>
          row.studentId.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      handleCloseModal();
    } catch (err) {
      setError('Error updating submission data.');
      console.error('Error updating submission data:', err);
    }
  };

  return (
    <div>
      <NavBar activeSection="submission">
        <SubmissionUpload />
        <div className="submission-main">
          <p>Project Submission Marks</p>
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
            <table className='submission-table'>
              <thead>
                <tr>
                  <th>Sl No</th>
                  <th>Student Name</th>
                  <th>Student ID</th>
                  <th>Project Title</th>
                  <th>Submission Date</th>
                  <th>Marks Awarded</th>
                  <th>Comments</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((row, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{row.studentName}</td>
                      <td>{row.studentId}</td>
                      <td>{row.projectTitle}</td>
                      <td>{formatDateToDisplay(new Date(row.submitDate).toISOString().split('T')[0])}</td>
                      <td>{row.marks}</td>
                      <td>{row.comments}</td>
                      <td>
                        <button className='edit-btn' onClick={() => handleEditClick(row)}>Edit</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center' }}>No match found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </NavBar>

      {editingRow && (
        <EditSubmissionForm
          isOpen={true}
          onClose={handleCloseModal}
          formData={formData}
          setFormData={setFormData}
          onConfirmClick={handleConfirmClick}
          error={error}
        />
      )}
    </div>
  );
}

export default Submission;
