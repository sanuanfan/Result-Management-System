import React, { useState, useRef } from 'react';
import './Review.css'; // Ensure this file has your required styles
import axios from 'axios';

const LinkedinUpload = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState(null);

  const fileInputRef = useRef(null);

  // Open file dialog on button click
  const handleOnClick = () => {
    fileInputRef.current.click();
  };

  // Open the popup for file upload
  const handleButtonClick = () => {
    setShowPopup(true);
  };

  // Close the popup and reset the file input
  const handleClosePopup = () => {
    setShowPopup(false);
    setFileName(null);
    setFile(null);
  };

  // Handle form submission (file upload)
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert('Please choose a file before submitting.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Send a POST request to the backend to upload the LinkedIn data file
      const response = await axios.post('http://localhost:5000/api/review/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data); // Handle the response as needed
      alert('File uploaded successfully!');
      setFileName(null);
      setFile(null);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please try again.');
      setFileName(null);
      setFile(null);
    }

    setShowPopup(false);
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : ''); // Set file name or clear it if no file is selected
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
            <h2>Upload LinkedIn Data</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="custom-file-upload">
                <input
                  type="file"
                  id="fileInput"
                  name="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
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

export default LinkedinUpload;
