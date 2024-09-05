import React, { useState, useEffect } from 'react';
import NavBar from '../Navbar';
import './Assessment.css';
import EditAssessmentForm from './EditAssessment';
import AssessmentUpload from './AssessmentUpload';
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

function Assessment() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [formData, setFormData] = useState({ name: '', date: '', assessmentType: '', score: '' });
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // State for search input

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

  // Filter data based on search input
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(row => 
        row.studentId.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, data]);

  const handleEditClick = (row) => {
    setEditingRow(row);
    // Format the date for input correctly
    const formattedDate = formatDateToDisplay(new Date(row.Date).toISOString().split('T')[0]);
    setFormData({ 
      name: row.studentName,
      date: formattedDate,  // Ensure date is correctly formatted for input field
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

    // Format date for API
    const formattedDateForUpdate = formatDateForInput(date);

    try {
        const response = await axios.put(`http://localhost:5000/api/assessment/${editingRow._id}`, {
            name: formData.name,
            date: formattedDateForUpdate,
            assessmentType: formData.assessmentType,
            score: formData.score
        });

        // Update the local state with the response data
        const updatedData = data.map(row => row._id === editingRow._id 
            ? { 
                ...row, 
                Date: formattedDateForUpdate,  // Correctly update Date property
                assessmentType: formData.assessmentType, 
                score: formData.score 
              } 
            : row
        );
        
        setData(updatedData);
        // Also update the filtered data with the new date
        setFilteredData(updatedData.filter(row => 
            row.studentId.toLowerCase().includes(searchTerm.toLowerCase())
        ));

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term
              name='studentId'
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
                    <tr key={row.studentId || index}>
                      <td>{row.studentName}</td>
                      <td>{row.studentId}</td>
                      <td>{formatDateToDisplay(new Date(row.Date).toISOString().split('T')[0])}</td>
                      <td>{row.assessmentType}</td>
                      <td>{row.score}</td>
                      <td>
                        <button className='edit-btn' onClick={() => handleEditClick(row)}>Edit</button>
                        {editingRow && editingRow.studentId === row.studentId && (
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
                    <td colSpan="6" style={{ textAlign: 'center' }}>No match found</td>
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
