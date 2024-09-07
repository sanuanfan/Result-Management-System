import React from 'react';
import './EditAssessment.css'; // Ensure this CSS file is created and properly styled

// Format date for input (yyyy-MM-dd)
const formatDateForInput = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
};

// Format date for display (dd-mm-yyyy)
const formatDateForDisplay = (date) => {
    if (!date) return 'N/A';
    const d = new Date(date);
    const day = (`0${d.getDate()}`).slice(-2);
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
};

const EditAssessmentForm = ({ isOpen, onClose, formData, setFormData, onConfirmClick, error }) => {
    if (!isOpen) return null;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    return (
        <div className="modal-overlay-assessment">
            <div className="modal-content-assessment">
                <div className="close-button-assessment" onClick={onClose}>X</div>
                <h2>Edit Assessment</h2>
                <form className="edit-form-assessment">
                    <div className='input-container-assessment'>
                        <input
                            type="text"
                            name="name"
                            value={formData.name || ''}
                            placeholder="Name"
                            required
                            disabled
                            id='disable'
                        />
                    </div>
                    <div className='input-container-assessment'>
                        <input
                            type="date"
                            name="date"
                            value={formatDateForInput(formData.date) || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='input-container-assessment'>
                        <input
                            type="text"
                            name="assessmentType"
                            value={formData.assessmentType || ''}
                            onChange={handleChange}
                            placeholder="Assessment Type"
                            required
                        />
                    </div>
                    <div className='input-container-assessment-last'>
                        <input
                            type="number"
                            name="score"
                            value={formData.score || ''}
                            onChange={handleChange}
                            placeholder="Score"
                            min="0"
                            max="100"
                            required
                        />
                    </div>
                    {error && <p className='error-message1' style={{ color: 'red', fontSize: '13px', marginTop: '10px' }}>{error}</p>}
                    <div className="button-group-assessment">
                        <button type="button" className="confirm-button" onClick={onConfirmClick}>Confirm</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditAssessmentForm;
