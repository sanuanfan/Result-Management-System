import React, { useState,useEffect } from 'react';
import NavBar from '../Navbar';
import './Submission.css';
import EditSubmissionForm from './EditSubissionForm';
import SubmissionUpload from './SubmissionUpload';
import axios from 'axios';

function Submission() {
  const [data, setData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [formData, setFormData] = useState({name:'', projectTitle: '', submissionDate: '', marks: '', comments: '' });
  const [error, setError] = useState('');
  // const [searchTerm, setSearchTerm] = useState(''); // State for search input


 // Fetch assessment data from the backend
 useEffect(() => {
  const fetchSbmissionData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/submission');
      setData(response.data);
      // setFilteredData(response.data); // Initialize filtered data
    } catch (error) {
      console.error('Error fetching assessment data:', error);
    }
  };

  fetchSbmissionData();
}, []);




  // const handleEditClick = (row) => {
  //   setEditingRow(row);
  //   setFormData({ 
  //     name:row.studentName,
  //     projectTitle: row.projectTitle, 
  //     submissionDate: row.submissionDate, 
  //     marks: row.marks, 
  //     comments: row.comments 
  //   });
  //   setError('');
  // };


  // Helper functions to handle date formatting
const formatDateToDisplay = (date) => {
  const [year, month, day] = date.split('-');
  return `${day}-${month}-${year}`;
};

const formatDateForInput = (date) => {
  const [day, month, year] = date.split('-');
  return `${year}-${month}-${day}`;
};


  const handleEditClick = (row) => {
    setEditingRow(row);
    // Format the date for input correctly
    const formattedDate = formatDateToDisplay(new Date(row.submitDate).toISOString().split('T')[0]);
    setFormData({ 
      name:row.studentName,
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
    const { projectTitle, date, marks, comments } = formData;

    // Validate input
    if (!projectTitle||!date || !marks === '' || !comments) {
      setError('All fields are required.');
      return;
    }
    if (marks < 0 || marks > 100) {
      setError('Score must be between 0 and 100.');
      return;
    }

    // Format date for API
    const formattedDateForUpdate = formatDateForInput(date);

    try {
        const response = await axios.put(`http://localhost:5000/api/submission/${editingRow._id}`, {
            name: formData.name,
            projectTitle:formData.projectTitle,
            date: formattedDateForUpdate,
            marks: formData.marks,
            comments: formData.comments
        });

        // Update the local state with the response data
        const updatedData = data.map(row => row._id === editingRow._id 
            ? { 
                ...row, 
                projectTitle:formData.projectTitle,
                date: formattedDateForUpdate,  // Correctly update Date property
                marks: formData.marks,
                comments: formData.comments
              } 
            : row
        );
        
        setData(updatedData);
        // Also update the filtered data with the new date
        // setFilteredData(updatedData.filter(row => 
        //     row.studentId.toLowerCase().includes(searchTerm.toLowerCase())
        // ));

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
                {data.map((row,index) => (
                  <tr key={row.studentId || index}>
                    <td>{row.studentName}</td>
                    <td>{row.studentId}</td>
                    <td>{row.projectTitle}</td>
                    <td>{new Date(row.submitDate).toLocaleDateString()}</td>
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
