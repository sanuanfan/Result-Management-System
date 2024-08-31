import React from 'react';
import NavBar from '../Navbar';
import '../AdminDashboard/AdminDashboard.css';

function AdminDashboard() {
  return (
    <div>
      <NavBar activeSection="dashboard">
        <div className="main-div">
          <p>List Of Students</p>
          <div className="tab">
          <table className="student-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Student ID</th>
                <th>Domain Name</th>
                <th>Attendance</th>
                <th>Total Score</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John Doe</td>
                <td>1011</td>
                <td>Web Development</td>
                <td>90%</td>
                <td>550</td>
              </tr>
              <tr>
                <td>Jane Smith</td>
                <td>1012</td>
                <td>Data Science</td>
                <td>95%</td>
                <td>620</td>
              </tr>
              <tr>
                <td>Michael Johnson</td>
                <td>1013</td>
                <td>Mobile App Development</td>
                <td>85%</td>
                <td>480</td>
              </tr><tr>
                <td>Michael Johnson</td>
                <td>1013</td>
                <td>Mobile App Development</td>
                <td>85%</td>
                <td>480</td>
              </tr><tr>
                <td>Michael Johnson</td>
                <td>1013</td>
                <td>Mobile App Development</td>
                <td>85%</td>
                <td>480</td>
              </tr>
              <tr>
                <td>Emily Davis</td>
                <td>1014</td>
                <td>AI & Machine Learning</td>
                <td>92%</td>
                <td>610</td>
              </tr>
              <tr>
                <td>William Brown</td>
                <td>1015</td>
                <td>Cloud Computing</td>
                <td>88%</td>
                <td>570</td>
              </tr>
              <tr>
                <td>Linda Wilson</td>
                <td>1016</td>
                <td>Cybersecurity</td>
                <td>93%</td>
                <td>590</td>
              </tr>
              <tr>
                <td>James Miller</td>
                <td>1017</td>
                <td>DevOps</td>
                <td>87%</td>
                <td>530</td>
              </tr>
              <tr>
                <td>Olivia Taylor</td>
                <td>1018</td>
                <td>Blockchain</td>
                <td>91%</td>
                <td>600</td>
              </tr>
              <tr>
                <td>Jane Smith</td>
                <td>1012</td>
                <td>Data Science</td>
                <td>95%</td>
                <td>620</td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
      </NavBar>
    </div>
  );
}

export default AdminDashboard;
