// ProfileForm.jsx
import React, { useState } from 'react';
import './ProfileForm.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ProfileForm = ({ isOpen, onClose, onConfirmClick, formData, onInputChange, error }) => {
    const [showPassword, setShowPassword] = useState({ newPassword: false, confirmPassword: false });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirmClick();
    };

    const togglePasswordVisibility = (field) => {
        setShowPassword(prevState => ({
            ...prevState,
            [field]: !prevState[field]
        }));
    };

    return (
        <div className="modal-overlay-profile">
            <div className="modal-content-profile">
                <div className="close-button-profile" onClick={onClose}>X</div>
                <h2>Change Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-container-profile1">
                        <div className="password-input-wrapper">
                            <input
                                type={showPassword.newPassword ? "text" : "password"}
                                id="newPassword"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={onInputChange}
                                required
                                placeholder='New Password'
                            />
                            <span className="password-toggle" onClick={() => togglePasswordVisibility('newPassword')}>
                                {showPassword.newPassword ? <FaEye /> :<FaEyeSlash /> }
                            </span>
                        </div>
                    </div>
                    <div className="input-container-profile-2">
                        <div className="password-input-wrapper">
                            <input
                                type={showPassword.confirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={onInputChange}
                                required
                                placeholder='Confirm Password'
                            />
                            <span className="password-toggle" onClick={() => togglePasswordVisibility('confirmPassword')}>
                                {showPassword.confirmPassword ?   <FaEye />:<FaEyeSlash />}
                            </span>
                        </div>
                    </div>
                    {error && <p className="error-message-profile" style={{ color: 'red', margin: '0px', fontSize: '12px' }}>{error}</p>}
                    <button type="submit">Confirm</button>
                </form>
            </div>
        </div>
    );
};

export default ProfileForm;
