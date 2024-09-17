import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../Navbar';
import './LinkedIn.css';
import EditLinkedInForm from './EditLinkedInForm';
import LinkedinUpload from './LinkedinUpload';

function LinkedIn() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingRow, setEditingRow] = useState(null);
  const [formData, setFormData] = useState({
    studentName: '',
    studentId: '',
    projectTitle: '',
    postDate: '',
    postScore: '',
    linkedInLink: '',
    remarks: ''
  });
  const [error, setError] = useState('');

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/linkedin`);
        setData(response.data);
        setFilteredData(response.data); // Initialize filtered data
      } catch (err) {
        console.error('Error fetching LinkedIn data:', err);
      }
    };

    fetchData();
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
      studentName: row.studentName,
      studentId: row.studentId,
      projectTitle: row.projectTitle,
      postDate: row.postDate, // Convert to yyyy-MM-dd
      postScore: row.postScore,
      linkedInLink: row.linkedInLink,
      remarks: row.remarks
    });
    setError('');
  };

  const handleCloseModal = () => {
    setEditingRow(null);
    setError('');
  };

  const handleConfirmClick = async () => {
    const { studentName, projectTitle, postDate, postScore, linkedInLink, remarks } = formData;
  
    if (!studentName || !projectTitle || !postDate || !postScore || !linkedInLink || !remarks) {
      setError('All fields are required.');
      return;
    }
  
    if (postScore < 0 || postScore > 100) {
      setError('Post score must be between 0 and 100.');
      return;
    }
  
    try {
      const updatedData = {
        studentName,
        projectTitle,
        postDate, // Already in yyyy-MM-dd format
        postScore,
        linkedInLink,
        remarks
      };
  
      // PUT request to update the specific record
      await axios.put(`${import.meta.env.VITE_API_URL}/api/linkedin/${editingRow._id}`, updatedData);
  
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
    } catch (err) {
      setError('Error updating LinkedIn Data.');
      console.error('Error updating LinkedIn Data:', err);
    }
  };
  

  // Custom date formatting function
  const formatDate = (date) => {
    if (!date) return 'N/A';
    const d = new Date(date);
    const day = (`0${d.getDate()}`).slice(-2);
    const month = (`0${d.getMonth() + 1}`).slice(-2); // Months are zero-based, so add 1
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div>
      <NavBar activeSection="linkedin">
        <LinkedinUpload />
        <div className="linkedin-main">
          <p>LinkedIn Post Marks</p>
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
            <table className="linkedin-table">
              <thead>
                <tr>
                  <th>Sl No</th>
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
                {filteredData.length > 0 ? (
                  filteredData.map((row, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{row.studentName}</td>
                      <td>{row.studentId}</td>
                      <td>{row.projectTitle}</td>
                      <td>{formatDate(row.postDate)}</td>
                      <td>{row.postScore}</td>
                      <td>
                        <a href={row.linkedInLink} target="_blank" rel="noopener noreferrer">
                          Post Link
                        </a>
                      </td>
                      <td>{row.remarks}</td>
                      <td>
                        <button className='edit-btn' onClick={() => handleEditClick(row)}>Edit</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="no-match">No match found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </NavBar>

      {editingRow && (
        <EditLinkedInForm
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

export default LinkedIn;
