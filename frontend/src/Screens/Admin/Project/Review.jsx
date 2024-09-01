import React, { useState } from 'react';
import NavBar from '../Navbar';
import '../Project/Review.css';

function Review() {
  const [data, setData] = useState([
    { id: 1, studentName: 'Alice Johnson', studentId: '1001', projectName: 'AI Chatbot', projectMarks: 85, remarks: 'Excellent work' },
    { id: 2, studentName: 'Bob Smith', studentId: '1002', projectName: 'Data Visualization Tool', projectMarks: 78, remarks: 'Good effort' },
    { id: 3, studentName: 'Charlie Brown', studentId: '1003', projectName: 'Web Scraper', projectMarks: 90, remarks: 'Highly impressive' },
    // Add more rows as needed
  ]);

  const [editingRow, setEditingRow] = useState(null);
  const [formData, setFormData] = useState({ projectName: '', projectMarks: '', remarks: '' });
  const [error, setError] = useState('');
  const [emptyFieldError, setEmptyFieldError] = useState('');

  const handleEditClick = (row) => {
    setEditingRow(row);
    setFormData({ 
      projectName: row.projectName, 
      projectMarks: row.projectMarks, 
      remarks: row.remarks 
    });
    setError('');
    setEmptyFieldError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'projectMarks') {
      if (value < 0 || value > 100) {
        setError('Project Marks must be between 0 and 100.');
      } else {
        setError('');
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleConfirmClick = () => {
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

    setData(data.map(row => row.id === editingRow.id ? { ...row, ...formData } : row));
    setEditingRow(null);
    setError('');
    setEmptyFieldError('');
  };

  return (
    <div>
      <NavBar activeSection="review">
        <div className="review-main">
          <p>Project Review Marks</p>
          <div className="tab">
            <table className='review-table'>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Student Id</th>
                  <th>Project Name</th>
                  <th>Project Marks</th>
                  <th>Remarks</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map(row => (
                  <tr key={row.id}>
                    <td>{row.studentName}</td>
                    <td>{row.studentId}</td>
                    <td>{row.projectName}</td>
                    <td>{row.projectMarks}</td>
                    <td>{row.remarks}</td>
                    <td>
                      <button className='edit-btn' onClick={() => handleEditClick(row)}>Edit</button>
                      {editingRow && editingRow.id === row.id && (
                        <div className='edit-card'>
                          <input 
                            type="text" 
                            name="projectName" 
                            value={formData.projectName} 
                            onChange={handleInputChange} 
                            placeholder="Project Name" 
                          />
                          <input 
                            type="number" 
                            name="projectMarks" 
                            value={formData.projectMarks} 
                            onChange={handleInputChange} 
                            placeholder="Project Marks" 
                            min="0" 
                            max="100" 
                          />
                          
                          <input 
                            type="text" 
                            name="remarks" 
                            value={formData.remarks} 
                            onChange={handleInputChange} 
                            placeholder="Remarks" 
                          />
                           {error && <p id='error-message1'>{error}</p>}
                          <button className='confirm-btn' onClick={handleConfirmClick}>Confirm</button>
                        </div>
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

export default Review;
