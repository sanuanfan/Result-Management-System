import React, { useRef } from 'react'
import './NavBar.css'
import { useNavigate } from 'react-router-dom'



function NavBar({ children, activeSection }) {

    const navigate = useNavigate()
    const fileInputRef = useRef(null)
    const handleOnClick = () => {
        fileInputRef.current.click();
        console.log('div clicked')
    }
    const gotoHome = () => {
        navigate('/admin/home');
    }

    const gotoAttendance = () => {
        navigate('/admin/attendance')
    }
    const gotoReview = () => {
        navigate('/admin/review')
    }
    const gotoAssessment = () => {
        navigate('/admin/assessment')
    }
    const gotoSubmission = () => {
        navigate('/admin/submission')
    }
    const gotoLinkedIn = () => {
        navigate('/admin/linkedin')
    }
    const logOut = () =>{
        navigate('/')
    }

    return (
        <div>
            <div className='main-container'>
                <button className="upload-btn" onClick={handleOnClick}>
                    <input type="file" style={{ display: 'none' }} ref={fileInputRef} />
                    Upload</button>
                    <button className='logout-btn' onClick={logOut}>Logout</button>
            <div className='side-bar'>

                    <div className='logo' ><i className='bx bxs-graduation' ></i></div>
                    <div className={`nav-content ${activeSection === 'dashboard' ? 'active' : ''}`} onClick={gotoHome} ><i className='bx bxs-dashboard'></i>Dashboard</div>
                    <div className={`nav-content ${activeSection === 'attendance' ? 'active' : ''}`} onClick={gotoAttendance}> <i className='bx bx-calendar-check'></i>Attendence</div>
                    <div className={`nav-content ${activeSection === 'review' ? 'active' : ''}`} onClick={gotoReview}> <i className='bx bx-code-block'></i>Review</div>
                    <div className={`nav-content ${activeSection === 'assessment' ? 'active' : ''}`} onClick={gotoAssessment}><i className='bx bx-edit' ></i>Assessment</div>
                    <div className={`nav-content ${activeSection === 'submission' ? 'active' : ''}`} onClick={gotoSubmission}><i className='bx bx-upload' ></i>Submission</div>
                    <div className={`nav-content ${activeSection === 'linkedin' ? 'active' : ''}`} onClick={gotoLinkedIn}><i className='bx bxl-linkedin-square' ></i>LinkedIn</div>
                    <div className='nav-content' id='avatar'></div>
                </div>
                {children}
                <div className='btm-container'>
                    <div className='bottom-bar'>
                        <div className={`btm-content ${activeSection === 'attendance' ? 'active' : ''}`} onClick={gotoAttendance}><i className='bx bx-calendar-check'></i>Attendence Marks</div>
                        <div className={`btm-content ${activeSection === 'review' ? 'active' : ''}`} onClick={gotoReview}><i className='bx bx-code-block'></i>Project Review Marks</div>
                        <div className={`btm-content ${activeSection === 'assessment' ? 'active' : ''}`} onClick={gotoAssessment}><i className='bx bx-edit' ></i>Assessment Marks</div>
                        <div className={`btm-content ${activeSection === 'submission' ? 'active' : ''}`} onClick={gotoSubmission}><i className='bx bx-upload' ></i>Project Submission Marks</div>
                        <div className={`btm-content ${activeSection === 'linkedin' ? 'active' : ''}`} onClick={gotoLinkedIn}><i className='bx bxl-linkedin-square' ></i>LinkedIn Post Marks</div>
                    </div>
                </div>

            </div>

        </div>
    )

}
export default NavBar
