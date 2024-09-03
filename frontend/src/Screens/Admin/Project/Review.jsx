import React, { useState } from 'react';
import NavBar from '../Navbar';
import '../Project/Review.css';
import EditForm from './EditReview';
import ReviewUpload from './ReviewUpload';

function Review() {
  const [data, setData] = useState([
    { id: 1, studentName: 'Alice Johnson', studentId: '1001', projectName: 'AI Chatbot', projectMarks: 85, remarks: 'Excellent work' },
    { id: 2, studentName: 'Bob Smith', studentId: '1002', projectName: 'Data Visualization Tool', projectMarks: 78, remarks: 'Good effort' },
    { id: 3, studentName: 'Charlie Brown', studentId: '1003', projectName: 'Web Scraper', projectMarks: 90, remarks: 'Highly impressive' },
  ]);

  const [editingRow, setEditingRow] = useState(null);
  const [formData, setFormData] = useState({ projectName: '', projectMarks: '', remarks: '',studentName:'' });
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = (row) => {
    setEditingRow(row);
    setFormData({
      projectName: row.projectName,
      projectMarks: row.projectMarks,
      remarks: row.remarks,
      studentName: row.studentName
    });
    setIsModalOpen(true);
    setError('');
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
    if (!formData.projectName || !formData.projectMarks || formData.remarks === '') {
      setError('All fields are required.');
      return;
    }
    if (formData.projectMarks < 0 || formData.projectMarks > 100) {
      setError('Project Marks must be between 0 and 100.');
      return;
    }

    setData(data.map(row => row.id === editingRow.id ? { ...row, ...formData } : row));
    setIsModalOpen(false);
    setEditingRow(null);
    setError('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <NavBar activeSection="review">
        <ReviewUpload />
        <div className="review-main">
          <p>Project Review Marks</p>
          <div className='search-bar'>
            <input type="text" placeholder='Search by ID' />
            <i className='bx bx-search-alt' id='search-icon'></i>
          </div>
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <EditForm 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          formData={formData} 
          onInputChange={handleInputChange} 
          onConfirmClick={handleConfirmClick} 
          error={error}
        />
      </NavBar>
    </div>
  );
}

export default Review;
