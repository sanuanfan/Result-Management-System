import React, { useState,useRef} from 'react';
import './SubmissionUpload.css';
import axios from 'axios';

const SubmissionUpload = () => {
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
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/submission/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if(response.data.mismatch){
        alert('File uploaded successfully, but some mismatched data was discarded.');

      } else{

        alert('File uploaded successfully!');
      }
      setFileName(null);
      setFile(null)
      
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please try again.');
      setFileName(null);
      setFile(null);
    }

    setShowPopup(false); // Close the popup after submission
  };



  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile); 
    setFileName(selectedFile ? selectedFile.name : ''); 
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

export default SubmissionUpload;
