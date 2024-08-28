import React from 'react'
import '../Attendance/Attendance.css'
import NavBar from '../Navbar'

function Attendance() {
  return (
    <div>
      <NavBar activeSection="attendance">
     <div className="container-main">
      <p>Attendance Data</p>
      <table className='attendance-table'>
        <tr>
          <th>Student Name</th>
          <th>Student Id</th>
          <th>Week1</th>
          <th>Week2</th>
          <th>Week3</th>
          <th>Week4</th>
          <th>Total Attendance</th>
          <th>Actions</th>
        </tr>
        <tr>
        <td>John Doe</td>
        <td>1011</td>
        <td>Present</td>
        <td>Absent</td>
        <td>Present</td>
        <td>Present</td>
        <td>75%  </td>
        <td className='centre-btn'><button  className='edit-btn'><i class='bx bxs-edit-alt' ></i>Edit</button></td>
    </tr>
    
    <tr>
        <td>Jane Smith</td>
        <td>1012</td>
        <td>Present</td>
        <td>Present</td>
        <td>Present</td>
        <td>Present</td>
        <td>100%</td>
        <td className='centre-btn'><button  className='edit-btn'><i class='bx bxs-edit-alt' ></i>Edit</button></td>


    </tr>
    <tr>
        <td>Michael Johnson</td>
        <td>1013</td>
        <td>Absent</td>
        <td>Present</td>
        <td>Present</td>
        <td>Absent</td>
        <td>50%</td>
        <td className='centre-btn'><button  className='edit-btn'><i class='bx bxs-edit-alt' ></i>Edit</button></td>

    </tr>
    <tr>
        <td>Emily Davis</td>
        <td>1014</td>
        <td>Present</td>
        <td>Absent</td>
        <td>Present</td>
        <td>Present</td>
        <td>75%</td>
        <td className='centre-btn'><button  className='edit-btn'><i class='bx bxs-edit-alt' ></i>Edit</button></td>


    </tr>
    <tr>
        <td>William Brown</td>
        <td>1015</td>
        <td>Present</td>
        <td>Present</td>
        <td>Absent</td>
        <td>Absent</td>
        <td>50%</td>
        <td className='centre-btn'><button  className='edit-btn'><i class='bx bxs-edit-alt' ></i>Edit</button></td>


    </tr>
    <tr>
        <td>Linda Wilson</td>
        <td>1016</td>
        <td>Absent</td>
        <td>Present</td>
        <td>Present</td>
        <td>Present</td>
        <td>75%</td>
        <td className='centre-btn'><button  className='edit-btn'><i class='bx bxs-edit-alt' ></i>Edit</button></td>


    </tr>
    <tr>
        <td>James Miller</td>
        <td>1017</td>
        <td>Present</td>
        <td>Absent</td>
        <td>Present</td>
        <td>Absent</td>
        <td>50%</td>
        <td className='centre-btn'><button  className='edit-btn'><i class='bx bxs-edit-alt' ></i>Edit</button></td>


    </tr>
    <tr>
        <td>Olivia Taylor</td>
        <td>1018</td>
        <td>Present</td>
        <td>Absent</td>
        <td>Present</td>
        <td>Absent</td>
        <td>50%</td>
        <td className='centre-btn'><button  className='edit-btn'><i class='bx bxs-edit-alt' ></i>Edit</button></td>


    </tr>
      </table>
     </div>
     </NavBar>
    </div>
  )
}

export default Attendance
