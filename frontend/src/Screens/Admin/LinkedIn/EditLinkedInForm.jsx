import React from 'react';
import './EditLinkedInForm.css';

const EditLinkedInForm = ({ isOpen, onClose, formData, setFormData, onConfirmClick, error }) => {
    if (!isOpen) return null;

    // Format date to yyyy-MM-dd
    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        const year = d.getFullYear();
        const month = (`0${d.getMonth() + 1}`).slice(-2); // Months are zero-based, so add 1
        const day = (`0${d.getDate()}`).slice(-2);
        return `${year}-${month}-${day}`;
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
                            name="Student Name"
                            value={formData.studentName || ''}
                            placeholder="Project Title"
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
                          
                        />
                    </div>
                    <div className="input-container-linkedin">
                        <input
                            type="date"
                            name="postDate"
                            value={formatDate(formData.postDate) || ''}
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
