import React, { useState, useEffect } from 'react';
import NavBar from '../Navbar';
import './Assessment.css';
import EditAssessmentForm from './EditAssessment';
import AssessmentUpload from './AssessmentUpload';
import axios from 'axios';

// Custom date formatting functions
const formatDateToDisplay = (date) => {
    if (!date) return 'N/A';
    const d = new Date(date);
    const day = (`0${d.getDate()}`).slice(-2);
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
};

const formatDateForInput = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
};

function Assessment() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [formData, setFormData] = useState({ name: '', date: '', assessmentType: '', score: '' });
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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

  // Filter data based on search term
  useEffect(() => {
    const filtered = data.filter(row =>
      row.studentId.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  const handleEditClick = (row) => {
    setEditingRow(row);
    setFormData({
      name: row.studentName,
      date: formatDateToDisplay(row.Date),
      assessmentType: row.assessmentType,
      score: row.score
    });
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleConfirmClick = async () => {
    const { date, assessmentType, score } = formData;

    if (!date || !assessmentType || score === '') {
      setError('All fields are required.');
      return;
    }

    if (score < 0 || score > 100) {
      setError('Score must be between 0 and 100.');
      return;
    }

    const formattedDateForUpdate = formatDateForInput(date);

    try {
      await axios.put(`http://localhost:5000/api/assessment/${editingRow._id}`, {
        name: formData.name,
        date: formattedDateForUpdate,
        assessmentType: formData.assessmentType,
        score: formData.score
      });

      const updatedData = data.map(row =>
        row._id === editingRow._id
          ? { ...row, Date: formattedDateForUpdate, assessmentType: formData.assessmentType, score: formData.score }
          : row
      );

      setData(updatedData);
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
              onChange={(e) => setSearchTerm(e.target.value)}
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
                      <td>{formatDateToDisplay(row.Date)}</td>
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
                    <td colSpan="7" style={{ textAlign: 'center' }}>No match found</td>
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
