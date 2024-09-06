import React from 'react';
import './EditAssessment.css'; // Ensure this CSS file is created and properly styled

// Custom date formatting functions
const formatDateForInput = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
};

const EditAssessmentForm = ({ isOpen, onClose, formData, onInputChange, onConfirmClick, error }) => {
    if (!isOpen) return null;

    const formattedDateForInput = formatDateForInput(formData.date);

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
                            value={formattedDateForInput} // Use formatted date
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
                    {error && <p className='error-message1' style={{ color: 'red', fontSize: '13px', marginTop: '10px' }}>{error}</p>}
                    <button type="button" onClick={onConfirmClick} className="confirm-button">Confirm</button>
                </form>
            </div>
        </div>
    );
};

export default EditAssessmentForm;
