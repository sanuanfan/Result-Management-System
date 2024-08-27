import React from 'react'
import NavBar from '../Components/NavBar'
import '../AdminDashboard/AdminDashboard.css'

function AdminDashboard() {
  return (
    <div>
      <NavBar activeSection="dashboard">
        <div className="main-div">
         <p>List Of Students</p>
         <table className="student-table">
          <tr>
          <th>Student Name</th>
            <th>Student ID</th>
            <th>Domain Name</th>
            <th>Attendance</th>
            <th>Total Score</th>
            </tr>
            <tr>
              
              <td>John Doe</td>
              <td>1</td>
              <td>Web Development</td>
              <td>90%</td>
              <td>550</td>
              </tr>
              <tr>
              <td>John Doe</td>
              <td>1</td>
              <td>Web Development</td>
              <td>90%</td>
              <td>550</td>
              </tr>
              <tr>
              <td>John Doe</td>
              <td>1</td>
              <td>Web Development</td>
              <td>90%</td>
              <td>550</td>
              </tr>  
              <tr>
              <td>John Doe</td>
              <td>1</td>
              <td>Web Development</td>
              <td>90%</td>
              <td>550</td>
              </tr>  
              <tr>
              <td>John Doe</td>
              <td>1</td>
              <td>Web Development</td>
              <td>90%</td>
              <td>550</td>
              </tr>  
              <tr>
              <td>John Doe</td>
              <td>1</td>
              <td>Web Development</td>
              <td>90%</td>
              <td>550</td>
              </tr>  
              <tr>
              <td>John Doe</td>
              <td>1</td>
              <td>Web Development</td>
              <td>90%</td>
              <td>550</td>
              </tr>  
         </table>
       
        </div>

      </NavBar>
        
    </div>
  )
}

export default AdminDashboard
