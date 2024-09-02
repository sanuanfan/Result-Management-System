import React from 'react';
import './EditAssessment.css'; // Create a CSS file to style the modal

const EditAssessmentForm = ({ isOpen, onClose, formData, onInputChange, onConfirmClick, error }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay-assessment">
            <div className="modal-content-assessment">
                <div className="close-button-assessment" onClick={onClose}>X</div>
                <h2>Edit Assessment</h2>
                <form className="edit-form-assessment">
                <div className='input-container-assessment'>
                        <input
                        id='disable'
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={onInputChange}
                            disabled
                        />
                    </div>
                    <div className='input-container-assessment'>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={onInputChange}
                            required
                        />
                    </div>
                    <div className='input-container-assessment'>
                        <input
                            type="text"
                            name="assessmentType"
                            value={formData.assessmentType}
                            onChange={onInputChange}
                            placeholder="Assessment Type"
                            required
                        />
                    </div>
                    <div className='input-container-assessment-last'>
                        <input
                            type="number"
                            name="score"
                            value={formData.score}
                            onChange={onInputChange}
                            placeholder="Score"
                            min="0"
                            max="100"
                            required
                        />
                    </div>
                    {error && <p className='error-message1' style={{ color: 'red', margin: '0px', fontSize: '12px' }}>{error}</p>}
                    <button type="button" onClick={onConfirmClick}>Confirm</button>
                </form>
            </div>
        </div>
    );
};

export default EditAssessmentForm;
