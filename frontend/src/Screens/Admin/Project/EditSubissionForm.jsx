import React from 'react';
import './EditSubmissionForm.css'; // Create a CSS file for styling the edit form

const EditSubmissionForm = ({ isOpen, onClose, formData, onInputChange, onConfirmClick, error }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay-submission">
            <div className="modal-content-submission">
                <div className="close-button-submission" onClick={onClose}>X</div>
                <h2>Edit Submission</h2>
                <form className="edit-form-submission">
                <div className="input-container-submission">
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
                    <div className="input-container-submission">
                        <input
                            type="text"
                            name="projectTitle"
                            value={formData.projectTitle}
                            onChange={onInputChange}
                            placeholder="Project Title"
                            required
                        />
                    </div>
                    <div className="input-container-submission">
                        <input
                            type="date"
                            name="submissionDate"
                            value={formData.submissionDate}
                            onChange={onInputChange}
                            required
                        />
                    </div>
                    <div className="input-container-submission">
                        <input
                            type="number"
                            name="marks"
                            value={formData.marks}
                            onChange={onInputChange}
                            placeholder="Marks Awarded"
                            min="0"
                            max="100"
                            required
                        />
                    </div>
                    <div className="input-container-submission-last">
                        <input
                            type='text'
                            name="comments"
                            value={formData.comments}
                            onChange={onInputChange}
                            placeholder="Comments"
                            required
                        />
                    </div>
                    {error && <p className="error-message1" style={{ color: 'red', margin: '0px', fontSize: '12px' }}>{error}</p>}
                    <button type="button" onClick={onConfirmClick}>Confirm</button>
                </form>
            </div>
        </div>
    );
};

export default EditSubmissionForm;
