import React, { useRef, useState, useEffect } from 'react';
import './NavBar.css';
import { useNavigate } from 'react-router-dom';
import ProfileForm from './ProfileForm';

function NavBar({ children, activeSection }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth > 770);

    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const handleOnClick = () => {
        fileInputRef.current.click();
        console.log('div clicked');
    };

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
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleToggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 770) {
                setIsSidebarVisible(true);
            } else if (window.innerWidth <= 770) {
                setIsSidebarVisible(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div>
            <div className='main-container'>
                <button className="upload-btn" onClick={handleOnClick}>
                    <input type="file" style={{ display: 'none' }} ref={fileInputRef} />
                    Upload
                </button>
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
                    <ProfileForm isOpen={isModalOpen} onClose={handleCloseModal} />
                </div>
                {children}
                <div className='btm-container'>
                    <div className='bottom-bar'>
                        <div className={`btm-content ${activeSection === 'attendance' ? 'active' : ''}`} onClick={gotoAttendance}>
                            <i className='bx bx-calendar-check'></i> Attendance Marks
                        </div>
                        <div className={`btm-content ${activeSection === 'review' ? 'active' : ''}`} onClick={gotoReview}>
                            <i className='bx bx-code-block'></i> Project Review Marks
                        </div>
                        <div className={`btm-content ${activeSection === 'assessment' ? 'active' : ''}`} onClick={gotoAssessment}>
                            <i className='bx bx-edit'></i> Assessment Marks
                        </div>
                        <div className={`btm-content ${activeSection === 'submission' ? 'active' : ''}`} onClick={gotoSubmission}>
                            <i className='bx bx-upload'></i> Project Submission Marks
                        </div>
                        <div className={`btm-content ${activeSection === 'linkedin' ? 'active' : ''}`} onClick={gotoLinkedIn}>
                            <i className='bx bxl-linkedin-square'></i> LinkedIn Post Marks
                        </div>
                    </div>
                </div>
                <div
                    className={`toggle-arrow ${!isSidebarVisible ? '' : 'visible'}`}
                    onClick={handleToggleSidebar}
                >
                    <i className='bx bx-chevron-right'></i>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
