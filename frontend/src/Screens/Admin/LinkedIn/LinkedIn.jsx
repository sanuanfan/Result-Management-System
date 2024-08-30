import React from 'react';
import NavBar from '../Navbar';
import './LinkedIn.css';

function LinkedIn() {
  return (
    <div>
      <NavBar activeSection="linkedin">
        <div className="linkedin-main">
          <p>LinkedIn Post Marks</p>
          <table className="linkedin-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Student ID</th>
                <th>Project Title</th>
                <th>LinkedIn Post Link</th>
                <th>Post Score</th>
                <th>Post Date</th>
                <th>Remarks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John Doe</td>
                <td>101</td>
                <td>Web Dev App</td>
                <td><a href="https://linkedin.com/post/12345" target="_blank" rel="noopener noreferrer">Post Link</a></td>
                <td>85.75</td>
                <td>2024-08-01</td>
                <td>High engagement</td>
                <td><button className='edit-btn'>Edit</button></td>
              </tr>
              <tr>
                <td>Jane Smith</td>
                <td>102</td>
                <td>Data Analysis Tool</td>
                <td><a href="https://linkedin.com/post/67890" target="_blank" rel="noopener noreferrer">Post Link</a></td>
                <td>92.40</td>
                <td>2024-08-05</td>
                <td>Excellent feedback</td>
                <td><button className='edit-btn'>Edit</button></td>
              </tr>
              <tr>
                <td>Michael Johnson</td>
                <td>103</td>
                <td>Mobile App</td>
                <td><a href="https://linkedin.com/post/11223" target="_blank" rel="noopener noreferrer">Post Link</a></td>
                <td>78.20</td>
                <td>2024-08-10</td>
                <td>Needs more visibility</td>
                <td><button className='edit-btn'>Edit</button></td>
              </tr>
              <tr>
                <td>Emily Davis</td>
                <td>104</td>
                <td>AI Chatbot</td>
                <td><a href="https://linkedin.com/post/44556" target="_blank" rel="noopener noreferrer">Post Link</a></td>
                <td>88.10</td>
                <td>2024-08-12</td>
                <td>Positive responses</td>
                <td><button className='edit-btn'>Edit</button></td>
              </tr>
              <tr>
                <td>William Brown</td>
                <td>105</td>
                <td>Cloud Solution</td>
                <td><a href="https://linkedin.com/post/33445" target="_blank" rel="noopener noreferrer">Post Link</a></td>
                <td>80.55</td>
                <td>2024-08-15</td>
                <td>Moderate engagement</td>
                <td><button className='edit-btn'>Edit</button></td>
              </tr>
              <tr>
                <td>Linda Wilson</td>
                <td>106</td>
                <td>Cybersecurity App</td>
                <td><a href="https://linkedin.com/post/55678" target="_blank" rel="noopener noreferrer">Post Link</a></td>
                <td>90.00</td>
                <td>2024-08-20</td>
                <td>High engagement with experts</td>
                <td><button className='edit-btn'>Edit</button></td>
              </tr>
              <tr>
                <td>James Miller</td>
                <td>107</td>
                <td>Blockchain Project</td>
                <td><a href="https://linkedin.com/post/99887" target="_blank" rel="noopener noreferrer">Post Link</a></td>
                <td>85.30</td>
                <td>2024-08-22</td>
                <td>Good visibility</td>
                <td><button className='edit-btn'>Edit</button></td>
              </tr>
              <tr>
                <td>Alice Johnson</td>
                <td>108</td>
                <td>AR Game</td>
                <td><a href="https://linkedin.com/post/77654" target="_blank" rel="noopener noreferrer">Post Link</a></td>
                <td>87.60</td>
                <td>2024-08-25</td>
                <td>Engaging content</td>
                <td><button className='edit-btn'>Edit</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </NavBar>
    </div>
  );
}

export default LinkedIn;
