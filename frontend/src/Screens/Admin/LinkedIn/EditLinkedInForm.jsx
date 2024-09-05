import React from 'react';
import './EditLinkedInForm.css';

const EditLinkedInForm = ({ isOpen, onClose, formData, setFormData, onConfirmClick, error }) => {
    if (!isOpen) return null;

    // Format date for input (yyyy-MM-dd)
    const formatDateForInput = (date) => {
        if (!date) return '';
        const d = new Date(date);
        const year = d.getFullYear();
        const month = (`0${d.getMonth() + 1}`).slice(-2); // Months are zero-based, so add 1
        const day = (`0${d.getDate()}`).slice(-2);
        return `${year}-${month}-${day}`;
    };

    // Format date for display (dd-mm-yyyy)
    const formatDateForDisplay = (date) => {
        if (!date) return 'N/A';
        const d = new Date(date);
        const day = (`0${d.getDate()}`).slice(-2);
        const month = (`0${d.getMonth() + 1}`).slice(-2); // Months are zero-based, so add 1
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    return (
        <div className="modal-overlay-linkedin">
            <div className="modal-content-linkedin">
                <div className="close-button-linkedin" onClick={onClose}>X</div>
                <h2>Edit LinkedIn Post</h2>
                <form className="edit-form-linkedin">
                    <div className="input-container-linkedin">
                        <input
                            type="text"
                            name="studentName"
                            value={formData.studentName || ''}
                            placeholder="Student Name"
                            required
                            disabled
                            id='disabled1'
                        />
                    </div>
                    <div className="input-container-linkedin">
                        <input
                            type="text"
                            name="projectTitle"
                            value={formData.projectTitle || ''}
                            onChange={handleChange}
                            placeholder="Project Title"
                            required
                            id='disabled2'
                            disabled
                        />
                    </div>
                    <div className="input-container-linkedin">
                        <input
                            type="date"
                            name="postDate"
                            value={formatDateForInput(formData.postDate) || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-container-linkedin">
                        <input
                            type="number"
                            name="postScore"
                            value={formData.postScore || ''}
                            onChange={handleChange}
                            placeholder="Post Score"
                            min="0"
                            max="100"
                            required
                        />
                    </div>
                    <div className="input-container-linkedin">
                        <input
                            type="text"
                            name="linkedInLink"
                            value={formData.linkedInLink || ''}
                            onChange={handleChange}
                            placeholder="LinkedIn Post Link"
                            required
                        />
                    </div>
                    <div className="input-container-linkedin-last">
                        <input
                            type='text'
                            name="remarks"
                            value={formData.remarks || ''}
                            onChange={handleChange}
                            placeholder="Remarks"
                            required
                        />
                    </div>
                    {error && <p className="error-message1" style={{ color: 'red', margin: '0px', fontSize: '12px' }}>{error}</p>}
                    <div className="button-group-linkedin">
                        <button type="button" className="confirm-btn" onClick={onConfirmClick}>Confirm</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditLinkedInForm;
