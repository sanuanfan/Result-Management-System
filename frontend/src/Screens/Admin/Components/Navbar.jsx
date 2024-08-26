import React from 'react'
import '../Components/NavBar.css'

function NavBar() {
  return (
    <div>
        <div className='main-container'>
            <div className='side-bar'>
                    <div className='logo'></div>
                   <div className='nav-content'> <i class='bx bx-calendar-check'></i>Attendence</div>
                   <div className='nav-content'> <i class='bx bx-code-block'></i>Review</div>
                   <div className='nav-content' ><i class='bx bx-edit' ></i>Assessment</div>
                   <div className='nav-content'><i class='bx bx-upload' ></i>Submission</div>
                   <div className='nav-content'><i class='bx bxl-linkedin-square' ></i>LinkedIn</div>
                   <div className='nav-content' id='avatar'></div>
            </div>
            <div className='btm-container'>
            <div className='bottom-bar'>
               <div className='btm-content'><i class='bx bx-calendar-check'></i>Attendence Marks</div>
                <div className='btm-content'><i class='bx bx-code-block'></i>Project Review Marks</div>
                <div className='btm-content'><i class='bx bx-edit' ></i>Assessment Marks</div>
                <div className='btm-content'><i class='bx bx-upload' ></i>Project Submission Marks</div>
                <div className='btm-content'><i class='bx bxl-linkedin-square' ></i>LinkedIn Post Marks</div>
            </div>
            </div>

        </div>
      
    </div>
  )
}

export default NavBar
