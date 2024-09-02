import React, { useState } from 'react';
import NavBar from '../Navbar';
import './LinkedIn.css';
import EditLinkedInForm from './EditLinkedInForm';

function LinkedIn() {
  const [data, setData] = useState([
    { id: 1, studentName: 'John Doe', studentId: '101', projectTitle: 'Web Dev App', postDate: '2024-08-01', postScore: 85.75, postLink: 'https://linkedin.com/post/12345', remarks: 'High engagement' },
    { id: 2, studentName: 'Jane Smith', studentId: '102', projectTitle: 'Data Analysis Tool', postDate: '2024-08-05', postScore: 92.40, postLink: 'https://linkedin.com/post/67890', remarks: 'Excellent feedback' },
    // Add more rows as needed
  ]);

  const [editingRow, setEditingRow] = useState(null);
  const [formData, setFormData] = useState({name:'', projectTitle: '', postDate: '', postScore: '', postLink: '', remarks: '' });
  const [error, setError] = useState('');

  const handleEditClick = (row) => {
    setEditingRow(row);
    setFormData({ 
      name:row.studentName,
      projectTitle: row.projectTitle, 
      postDate: row.postDate, 
      postScore: row.postScore, 
      postLink: row.postLink, 
      remarks: row.remarks 
    });
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleConfirmClick = () => {
    const { projectTitle, postDate, postScore, postLink, remarks } = formData;

    // Validate input
    if (!projectTitle || !postDate || postScore === '' || !postLink || !remarks) {
      setError('All fields are required.');
      return;
    }
    if (postScore < 0 || postScore > 100) {
      setError('Post Score must be between 0 and 100.');
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
      <NavBar activeSection="linkedin">
        <div className="linkedin-main">
          <p>LinkedIn Post Marks</p>
          <div className="tab">
            <table className="linkedin-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Student ID</th>
                  <th>Project Title</th>
                  <th>Post Date</th>
                  <th>Post Score</th>
                  <th>LinkedIn Post Link</th>
                  <th>Remarks</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map(row => (
                  <tr key={row.id}>
                    <td>{row.studentName}</td>
                    <td>{row.studentId}</td>
                    <td>{row.projectTitle}</td>
                    <td>{row.postDate}</td>
                    <td>{row.postScore}</td>
                    <td><a href={row.postLink} target="_blank" rel="noopener noreferrer">Post Link</a></td>
                    <td>{row.remarks}</td>
                    <td>
                      <button className='edit-btn' onClick={() => handleEditClick(row)}>Edit</button>
                      {editingRow && editingRow.id === row.id && (
                        <EditLinkedInForm
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

export default LinkedIn;
