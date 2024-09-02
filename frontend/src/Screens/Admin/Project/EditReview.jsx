// EditForm.jsx
import React, { useState } from 'react';
import './EditReviewForm.css'; // Create a CSS file to style the modal

const EditForm = ({ isOpen, onClose, formData, onInputChange, onConfirmClick, error }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay-review">
            <div className="modal-content-review">
                <div className="close-button-review" onClick={onClose}>X</div>
                <h2>Edit Project Review</h2>
                <form className="edit-form-review">
                <div className='input-container-review'>
                        <input
                            type="text"
                            name="name"
                            value={formData.studentName}
                            onChange={onInputChange}
                            placeholder="Project Name"
                            disabled
                            id='disable'

                        />
                    </div>
                    <div className='input-container-review'>
                        <input
                            type="text"
                            name="projectName"
                            value={formData.projectName}
                            onChange={onInputChange}
                            placeholder="Project Name"
                            required
                        />
                    </div>
                    <div className='input-container-review'>
                        <input
                            type="number"
                            name="projectMarks"
                            value={formData.projectMarks}
                            onChange={onInputChange}
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
                            onChange={onInputChange}
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
