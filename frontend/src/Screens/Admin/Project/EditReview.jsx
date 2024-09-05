import React from 'react';
import './EditReviewForm.css'; // Ensure this file exists and styles the modal correctly

const EditForm = ({ isOpen, onClose, formData, setFormData, onConfirmClick, error }) => {
    if (!isOpen) return null;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    return (
        <div className="modal-overlay-review">
            <div className="modal-content-review">
                <div className="close-button-review" onClick={onClose}>X</div>
                <h2>Edit Project Review</h2>
                <form className="edit-form-review">
                    <div className='input-container-review'>
                        <input
                            type="text"
                            name="studentName"
                            value={formData.studentName}
                            placeholder="Student Name"
                            disabled
                            id='disable'
                        />
                    </div>
                    <div className='input-container-review'>
                        <input
                            type="text"
                            name="projectName"
                            value={formData.projectName}
                            onChange={handleChange}
                            placeholder="Project Name"
                            required
                        />
                    </div>
                    <div className='input-container-review'>
                        <input
                            type="number"
                            name="projectMark"
                            value={formData.projectMark}
                            onChange={handleChange}
                            placeholder="Project Marks"
                            min="0"
                            max="100"
                            required
                        />
                    </div>
                    <div className='input-container-review-last'>
                        <input
                            type="text"
                            name="remarks"
                            value={formData.remarks}
                            onChange={handleChange}
                            placeholder="Remarks"
                        />
                    </div>
                    {error && <p style={{ color: 'red', margin: '0px', fontSize: '12px' }}>{error}</p>}
                    <button type="button" onClick={onConfirmClick}>Confirm</button>
                </form>
            </div>
        </div>
    );
};

export default EditForm;
