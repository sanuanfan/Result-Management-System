import React from 'react';
import './EditSubmissionForm.css'; // Create a CSS file for styling the edit form


// Helper functions to handle date formatting
const formatDateToDisplay = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
};

const formatDateForInput = (date) => {
    const [day, month, year] = date.split('-');
    return `${year}-${month}-${day}`;
};

const EditSubmissionForm = ({ isOpen, onClose, formData, onInputChange, onConfirmClick, error }) => {
    if (!isOpen) return null;

    const formattedDateForInput = formatDateForInput(formData.submissionDate);


    
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
                            name="date"
                            value={formattedDateForInput} // Use formatted date
                            onChange={(e) => {
                                // Convert the date to 'dd-mm-yyyy' format when changing the input value
                                const newFormattedDate = formatDateToDisplay(e.target.value);
                                onInputChange({ target: { name: 'date', value: newFormattedDate } });
                            }}
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
