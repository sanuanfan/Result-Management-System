import React from 'react'
import '../Student/student.css'

function HomeStudent() {


  const data = [
    { category: "Attendance", cutOff: 20, marks: 85, weightage: 10, remarks: "Good" },
    { category: "Project Review", cutOff: 20, marks: 90, weightage: 20, remarks: "Excellent" },
    { category: "Assessment", cutOff: 20, marks: 75, weightage: 30, remarks: "Average" },
    { category: "Project Submission", cutOff: 20, marks: 80, weightage: 25, remarks: "Good" },
    { category: "LinkedIn Post", cutOff: 20, marks: 70, weightage: 15, remarks: "Needs Improvement" },
  ];

  return (
    <div className='main-container'>
      <div className="nav-bar">
        <div className='logos'></div>
        <div className="download">
          Download
        </div>
      </div>

      <div className="sub-container">
        <div className="mini-container">
          <h3>Mark Display</h3>
          <div className='search'>
            <input type="text" placeholder='Enter Student ID' />
            <i className='bx bx-search-alt' id='search-icon'></i>
            <button className='search-btn'>Search</button>
          </div>

          <div className="table-container">
            <div className="table-left">
              <table className="result-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Cut-Off</th>
                    <th>Max-Mark</th>
                    <th>Marks Obtained</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index}>
                      <td>{row.category}</td>
                      <td>{row.cutOff}</td>
                      <td>{row.marks}</td>
                      <td>--</td>
                      <td>--</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
          <div className="review">

          </div>
          <div className="mark">
            <h3>Grand Total : 130</h3>
          </div>
        </div>
      </div>


    </div>
  )
}

export default HomeStudent
