import React, { useState, useEffect } from 'react';
import NavBar from '../Navbar';
import './Assessment.css';
import EditAssessmentForm from './EditAssessment';
import AssessmentUpload from './AssessmentUpload';
import axios from 'axios';

// Custom date formatting function
const formatDate = (date) => {
  if (!date) return 'N/A';
  const d = new Date(date);
  const day = (`0${d.getDate()}`).slice(-2);
  const month = (`0${d.getMonth() + 1}`).slice(-2); // Months are zero-based, so add 1
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

function Assessment() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingRow, setEditingRow] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    assessmentType: '',
    score: ''
  });
  const [error, setError] = useState('');

  // Fetch assessment data
  useEffect(() => {
    const fetchAssessmentData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/assessment');
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error('Error fetching assessment data:', error);
      }
    };

    fetchAssessmentData();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter the data based on the search term
    const filtered = data.filter(row =>
      row.studentId.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleEditClick = (row) => {
    setEditingRow(row);
    setFormData({
      name: row.studentName,
      date: new Date(row.Date).toISOString().split('T')[0], // Convert to yyyy-MM-dd
      assessmentType: row.assessmentType,
      score: row.score
    });
    setError('');
  };

  const handleCloseModal = () => {
    setEditingRow(null);
    setError('');
  };

  const handleConfirmClick = async () => {
    const { name, date, assessmentType, score } = formData;

    if (!name || !date || !assessmentType || score === '') {
      setError('All fields are required.');
      return;
    }

    if (score < 0 || score > 100) {
      setError('Score must be between 0 and 100.');
      return;
    }

    try {
      const updatedData = {
        studentName: name,
        Date: date,
        assessmentType,
        score
      };

      // PUT request to update the specific record
      await axios.put(`http://localhost:5000/api/assessment/${editingRow._id}`, updatedData);

      // Update only the specific row in the data list
      const updatedDataList = data.map(item =>
        item._id === editingRow._id 
          ? { ...item, ...updatedData }
          : item
      );

      setData(updatedDataList);
      setFilteredData(updatedDataList.filter(row =>
        row.studentId.toLowerCase().includes(searchTerm.toLowerCase())
      ));
      handleCloseModal();
    } catch (error) {
      setError('Error updating assessment data.');
      console.error('Error updating assessment data:', error);
    }
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
              onChange={handleSearchChange}
            />
            <i className='bx bx-search-alt' id='search-icon'></i>
          </div>
          <div className="tab">
            <table className='assessment-table'>
              <thead>
                <tr>
                  <th>Sl No</th>
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
                    <tr key={row._id || index}>
                      <td>{index + 1}</td>
                      <td>{row.studentName}</td>
                      <td>{row.studentId}</td>
                      <td>{formatDate(row.Date)}</td>
                      <td>{row.assessmentType}</td>
                      <td>{row.score}</td>
                      <td>
                        <button className='edit-btn' onClick={() => handleEditClick(row)}>Edit</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="no-match">No match found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </NavBar>

      {editingRow && (
        <EditAssessmentForm
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

export default Assessment;
