import React, { useState, useRef } from 'react';
import axios from 'axios';
import './AttendanceUpload.css'; // Import the CSS file for styling

const AttendanceUpload = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState(null);

  const fileInputRef = useRef(null);

  const handleOnClick = () => {
    fileInputRef.current.click();
  };

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setFileName(null);
      setFile(null)
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile); // Set the selected file
    setFileName(selectedFile ? selectedFile.name : ''); // Set the file name or clear it if no file is selected
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert('Please choose a file before submitting.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Send a POST request to the backend to upload the file
      const response = await axios.post('http://localhost:5000/api/attendances/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log(response.data); // Handle the response as needed
      alert('File uploaded successfully!');
      setFileName(null);
      setFile(null)
      
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please try again.');
    }

    setShowPopup(false); // Close the popup after submission
  };

  return (
    <div className="upload-container">
      <button className="upload-btn" onClick={handleButtonClick}>
        Upload
      </button>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-form">
            <div className="close-button" onClick={handleClosePopup}>X</div>
            <h2>Upload File</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="custom-file-upload">
                <input 
                  type="file" 
                  id="fileInput" 
                  name="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }} // Hide the default file input
                />
                <button type="button" className="choose-file-button" onClick={handleOnClick}>
                  Choose File
                </button>
                <span className="file-name">{fileName || 'No file chosen'}</span>
              </div>
              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceUpload;
