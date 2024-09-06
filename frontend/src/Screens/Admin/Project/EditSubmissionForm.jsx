import React from 'react';
import './EditSubmissionForm.css'; // Ensure you have the correct path to your CSS file

// Helper function to format date to yyyy-MM-dd for the date input
const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2); // Months are zero-based, so add 1
    const day = (`0${d.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
};

const EditSubmissionForm = ({ isOpen, onClose, formData, setFormData, onConfirmClick, error }) => {
    if (!isOpen) return null;

    // Handle input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

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
                            name="studentName"
                            value={formData.studentName || ''}
                            placeholder="Student Name"
                            disabled
                        />
                    </div>
                    <div className="input-container-submission">
                        <input
                            type="text"
                            name="projectTitle"
                            value={formData.projectTitle || ''}
                            onChange={handleChange}
                            placeholder="Project Title"
                            required
                        />
                    </div>
                    <div className="input-container-submission">
                        <input
                            type="date"
                            name="submitDate"  // Ensure this matches your formData key
                            value={formatDate(formData.submitDate) || ''} // Format date to yyyy-MM-dd
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-container-submission">
                        <input
                            type="number"
                            name="marks"
                            value={formData.marks || ''}
                            onChange={handleChange}
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
                            value={formData.comments || ''}
                            onChange={handleChange}
                            placeholder="Comments"
                            required
                        />
                    </div>
                    {error && <p className="error-message1" style={{ color: 'red', margin: '0px', fontSize: '12px' }}>{error}</p>}
                    <div className="button-group-submission">
                        <button type="button" className="confirm-btn" onClick={onConfirmClick}>Confirm</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditSubmissionForm;
