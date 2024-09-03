import React, { useState,useRef} from 'react';
import './AssessmentUpload.css'; // Import the CSS file for styling

const AssessmentUpload = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [fileName, setFileName] = useState('');

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

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    setShowPopup(false);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file ? file.name : ''); // Set the file name or clear it if no file is selected
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

export default AssessmentUpload;
