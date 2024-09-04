import React, { useState, useEffect } from 'react';
import './NavBar.css'; // Import the CSS file for styling
import ProfileForm from './ProfileForm'; // Import the ProfileForm component
import { useNavigate } from 'react-router-dom';

function NavBar({ children, activeSection }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth > 770);
    const [formData, setFormData] = useState({ newPassword: '', confirmPassword: '' });
    const [error, setError] = useState('');

    const navigate = useNavigate();
    // const fileInputRef = useRef(null);

    // const handleOnClick = () => {
    //     fileInputRef.current.click();
    // };

    const gotoHome = () => {
        navigate('/admin/home');
    };

    const gotoAttendance = () => {
        navigate('/admin/attendance');
    };

    const gotoReview = () => {
        navigate('/admin/review');
    };

    const gotoAssessment = () => {
        navigate('/admin/assessment');
    };

    const gotoSubmission = () => {
        navigate('/admin/submission');
    };

    const gotoLinkedIn = () => {
        navigate('/admin/linkedin');
    };

    const logOut = () => {
        navigate('/');
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        document.body.classList.add('modal-open'); // Add class to disable background interaction
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = ''; // Re-enable scrolling
        document.body.classList.remove('modal-open'); // Remove class to re-enable background interaction
    };

    const handleToggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleConfirmClick = () => {
        const { newPassword, confirmPassword } = formData;
    
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
    
        setError('');
    
        alert('Password reset successful!');
    
        setFormData({ newPassword: '', confirmPassword: '' });
    
        handleCloseModal();
    };
    
    

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 770) {
                setIsSidebarVisible(true);
            } else {
                setIsSidebarVisible(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div>
            <div className='main-container'>
                {/* <button className="upload-btn" onClick={handleOnClick}>
                    <input type="file" style={{ display: 'none' }} ref={fileInputRef} />
                    Upload
                </button> */}
                <button className='logout-btn' onClick={logOut}>Logout</button>
                <div className={`side-bar ${isSidebarVisible ? 'visible' : 'hidden'}`}>
                    <div className='logo'><i className='bx bxs-graduation'></i></div>
                    <div className={`nav-content ${activeSection === 'dashboard' ? 'active' : ''}`} onClick={gotoHome}>
                        <i className='bx bxs-dashboard'></i> <p>Dashboard</p> 
                    </div>
                    <div className={`nav-content ${activeSection === 'attendance' ? 'active' : ''}`} onClick={gotoAttendance}>
                        <i className='bx bx-calendar-check'></i> <p>Attendance</p>
                    </div>
                    <div className={`nav-content ${activeSection === 'review' ? 'active' : ''}`} onClick={gotoReview}>
                        <i className='bx bx-code-block'></i>  <p>Review</p>
                    </div>
                    <div className={`nav-content ${activeSection === 'assessment' ? 'active' : ''}`} onClick={gotoAssessment}>
                        <i className='bx bx-edit'></i> <p>Assessment</p>
                    </div>
                    <div className={`nav-content ${activeSection === 'submission' ? 'active' : ''}`} onClick={gotoSubmission}>
                        <i className='bx bx-upload'></i> <p>Submission</p>
                    </div>
                    <div className={`nav-content ${activeSection === 'linkedin' ? 'active' : ''}`} onClick={gotoLinkedIn}>
                        <i className='bx bxl-linkedin-square'></i> <p>LinkedIn</p>
                    </div>
                    <div className='avatar' onClick={handleOpenModal}>
                        <i className='bx bxs-cog'></i>
                    </div>
                </div>
                {children}
                <div className='btm-container'>
            <div className='bottom-bar'>
               <div  className={`btm-content ${activeSection === 'attendance' ? 'active' : ''}`} onClick={gotoAttendance}><i className='bx bx-calendar-check'></i><p>Attendence Marks</p></div>
                <div className={`btm-content ${activeSection === 'review' ? 'active' : ''}`}  onClick={gotoReview}><i className='bx bx-code-block'></i><p>Project Review Marks</p></div>
                <div className={`btm-content ${activeSection === 'assessment' ? 'active' : ''}`}  onClick={gotoAssessment}><i className='bx bx-edit' ></i><p>Assessment Marks</p></div>
                <div className={`btm-content ${activeSection === 'submission' ? 'active' : ''}`} onClick={gotoSubmission}><i className='bx bx-upload' ></i><p>Project Submission Marks</p></div>
                <div className={`btm-content ${activeSection === 'linkedin' ? 'active' : ''}`} onClick={gotoLinkedIn}><i className='bx bxl-linkedin-square' ></i><p>LinkedIn Post Marks</p></div>
            </div>
            </div>

                {isModalOpen && (
                    <ProfileForm 
                        isOpen={isModalOpen} 
                        onClose={handleCloseModal} 
                        formData={formData}
                        onInputChange={handleInputChange}
                        onConfirmClick={handleConfirmClick}
                        error={error}
                    />
                )}
            </div>
            <button className="sidebar-toggle-btn" onClick={handleToggleSidebar}>
                {isSidebarVisible ? <i className='bx bxs-left-arrow' id='left-btn'></i> : <i className='bx bxs-right-arrow' ></i>}
            </button>
        </div>
    );
}

export default NavBar;
