import React, { useState } from 'react';
import './ProfileForm.css'; // Create a CSS file to style the modal
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ProfileForm = ({ isOpen, onClose }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isPasswordMatching) {
            alert('Password successfully changed!');
            onClose();
        }
    };

    const isPasswordMatching = newPassword === confirmPassword && newPassword !== '';

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="close-button" onClick={onClose}>X</div>
                <h2>Change Password</h2>
                <form className="add-student-form" onSubmit={handleSubmit}>
                    <div className='input-container'>
                        <input
                            type={newPasswordVisible ? 'text' : 'password'}
                            placeholder="New Password" required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)} />
                        <div className='eye-icon' onClick={() => setNewPasswordVisible(!newPasswordVisible)}>
                            {newPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                        </div>
                    </div>
                    <div className='input-container-two'>
                        <input
                            type={confirmPasswordVisible ? 'text' : 'password'}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required />
                        <div className='eye' onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                            {confirmPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                        </div>
                    </div>

                    {!isPasswordMatching && confirmPassword && (
                        <p style={{ color: 'red', margin: '0px', fontSize: '12px' }}>Passwords do not match.</p>
                    )}
                    <button type="submit" disabled={!isPasswordMatching}>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default ProfileForm;
