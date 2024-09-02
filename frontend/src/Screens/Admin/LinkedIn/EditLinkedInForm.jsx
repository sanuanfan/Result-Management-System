import React from 'react';
import './EditLinkedInForm.css'; // Create a CSS file for styling the edit form

const EditLinkedInForm = ({ isOpen, onClose, formData, onInputChange, onConfirmClick, error }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay-linkedin">
            <div className="modal-content-linkedin">
                <div className="close-button-linkedin" onClick={onClose}>X</div>
                <h2>Edit LinkedIn Post</h2>
                <form className="edit-form-linkedin">
                <div className="input-container-linkedin">
                        <input
                        id='disable'
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={onInputChange}
                            placeholder="Project Title"
                            disabled
                        />
                    </div>
                    
                    <div className="input-container-linkedin">
                        <input
                            type="text"
                            name="projectTitle"
                            value={formData.projectTitle}
                            onChange={onInputChange}
                            placeholder="Project Title"
                            required
                        />
                    </div>
                    <div className="input-container-linkedin">
                        <input
                            type="date"
                            name="postDate"
                            value={formData.postDate}
                            onChange={onInputChange}
                            required
                        />
                    </div>
                    <div className="input-container-linkedin">
                        <input
                            type="number"
                            name="postScore"
                            value={formData.postScore}
                            onChange={onInputChange}
                            placeholder="Post Score"
                            min="0"
                            max="100"
                            required
                        />
                    </div>
                    <div className="input-container-linkedin">
                        <input
                            type="text"
                            name="postLink"
                            value={formData.postLink}
                            onChange={onInputChange}
                            placeholder="LinkedIn Post Link"
                            required
                        />
                    </div>
                    <div className="input-container-linkedin-last">
                        <input
                            type='text'
                            name="remarks"
                            value={formData.remarks}
                            onChange={onInputChange}
                            placeholder="Remarks"
                            // className="textarea"
                            required
                        />
                    </div>
                    {error && <p className="error-message1"  style={{ color: 'red', margin: '0px', fontSize: '12px' }}>{error}</p>}
                    <div className="button-group-linkedin">
                        <button type="button" className="confirm-btn" onClick={onConfirmClick}>Confirm</button>
                        {/* <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button> */}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditLinkedInForm;
