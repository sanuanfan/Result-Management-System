import React, { useState } from 'react';
import NavBar from '../Navbar';
import './Assessment.css';

function Assessment() {
  const [data, setData] = useState([
    { id: 1, studentName: 'Alice Johnson', studentId: '2001', date: '2024-07-22', assessmentType: 'First Assessment', score: 160 },
    { id: 2, studentName: 'Bob Smith', studentId: '2002', date: '2024-07-22', assessmentType: 'Second Assessment', score: 142 },
    { id: 3, studentName: 'Charlie Brown', studentId: '2003', date: '2024-07-22', assessmentType: 'First Assessment', score: 172 },
    // Add more rows as needed
  ]);

  const [editingRow, setEditingRow] = useState(null);
  const [formData, setFormData] = useState({ date: '', assessmentType: '', score: '' });
  const [error, setError] = useState('');

  const handleEditClick = (row) => {
    setEditingRow(row);
    setFormData({ 
      date: row.date, 
      assessmentType: row.assessmentType, 
      score: row.score 
    });
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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
  };

  return (
    <div>
      <NavBar activeSection="assessment">
        <div className="assessment-main">
          <p>Assessment Marks</p>
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
                {data.map(row => (
                  <tr key={row.id}>
                    <td>{row.studentName}</td>
                    <td>{row.studentId}</td>
                    <td>{row.date}</td>
                    <td>{row.assessmentType}</td>
                    <td>{row.score}</td>
                    <td>
                      <button className='edit-btn' onClick={() => handleEditClick(row)}>Edit</button>
                      {editingRow && editingRow.id === row.id && (
                        <div className='edit-card'>
                          <input 
                            type="date" 
                            name="date" 
                            value={formData.date} 
                            onChange={handleInputChange} 
                          />
                          <input 
                            type="text" 
                            name="assessmentType" 
                            value={formData.assessmentType} 
                            onChange={handleInputChange} 
                            placeholder="Assessment Type" 
                          />
                          <input 
                            type="number" 
                            name="score" 
                            value={formData.score} 
                            onChange={handleInputChange} 
                            placeholder="Score" 
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

export default Assessment;
