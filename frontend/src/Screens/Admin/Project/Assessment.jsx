import React, { useState, useEffect } from 'react';
import NavBar from '../Navbar';
import './Assessment.css';
import EditAssessmentForm from './EditAssessment';
import AssessmentUpload from './AssessmentUpload';
import axios from 'axios';

function Assessment() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [formData, setFormData] = useState({ name: '', date: '', assessmentType: '', score: '' });
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch assessment data from the backend
  useEffect(() => {
    const fetchAssessmentData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/assessment');
        setData(response.data);
        setFilteredData(response.data); // Initialize filtered data
      } catch (error) {
        console.error('Error fetching assessment data:', error);
      }
    };

    fetchAssessmentData();
  }, []);

  const handleEditClick = (row) => {
    setEditingRow(row);
    setFormData({ 
      name: row.studentName,
      date: new Date(row.Date).toISOString().split('T')[0], // Format date to YYYY-MM-DD for input type
      assessmentType: row.assessmentType, 
      score: row.score 
    });
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleConfirmClick = async () => {
    const { date, assessmentType, score } = formData;

    // Validate input
    if (!date || !assessmentType || score === '') {
      setError('All fields are required.');
      return;
    }
    if (score < 0 || score > 100) {
      setError('Score must be between 0 and 100.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/assessment/${editingRow._id}`, {
        studentName: formData.name,
        Date: date,
        assessmentType: formData.assessmentType,
        score: formData.score
      });

      // Update the local state with the updated data
      const updatedData = data.map(row =>
        row._id === editingRow._id
          ? { ...row, Date: date, assessmentType: formData.assessmentType, score: formData.score }
          : row
      );
      setData(updatedData);
      
      const filtered = updatedData.filter(row =>
        row.studentId.toLowerCase().includes(searchTerm.toLowerCase())
      );
      

      
      setFilteredData(filtered);
      setEditingRow(null);
      setError('');
    } catch (error) {
      console.error('Error updating assessment:', error);
      setError('Failed to update the assessment.');
    }
  };

  const handleCloseModal = () => {
    setEditingRow(null);
    setError('');
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Filter the data based on the search term (studentId)
    const filtered = data.filter(row => 
      row.studentId.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <div>
      <NavBar activeSection="assessment">
        <AssessmentUpload />
        <div className="assessment-main">
          <p>Assessment Marks</p>
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
            <table className='assessment-table'>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Student Id</th>
                  <th>Date</th>
                  <th>Assessment Type</th>
                  <th>Score</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.studentName}</td>
                      <td>{row.studentId}</td>
                      <td>{new Date(row.Date).toLocaleDateString()}</td>
                      <td>{row.assessmentType}</td>
                      <td>{row.score}</td>
                      <td>
                        <button className='edit-btn' onClick={() => handleEditClick(row)}>Edit</button>
                        {editingRow && editingRow._id === row._id && (
                          <EditAssessmentForm
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
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-match">No match found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </NavBar>
    </div>
  );
}

export default Assessment;
