import React from 'react';
import NavBar from '../Navbar';
import '../Project/Submission.css';

function Submission() {
  return (
    <div>
      <NavBar activeSection="submission">
        <div className="submission-main">
          <p>Project Submission Marks</p>
          <div className="tab">
            <table className='submission-table'>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Student Id</th>
                  <th>Project Title</th>
                  <th>Submission Date</th>
                  <th>Marks Awarded</th>
                  <th>Comments</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Alice Johnson</td>
                  <td>3001</td>
                  <td>AI Chatbot</td>
                  <td>2024-08-10</td>
                  <td>90</td>
                  <td>Excellent implementation and functionality</td>
                  <td><button className='edit-btn'>Edit</button></td>
                </tr>
                <tr>
                  <td>Bob Smith</td>
                  <td>3002</td>
                  <td>Data Visualization Tool</td>
                  <td>2024-08-12</td>
                  <td>85</td>
                  <td>Good use of libraries and clean UI</td>
                  <td><button className='edit-btn'>Edit</button></td>
                </tr>
                <tr>
                  <td>Charlie Brown</td>
                  <td>3003</td>
                  <td>Web Scraper</td>
                  <td>2024-08-14</td>
                  <td>92</td>
                  <td>Highly functional with extensive features</td>
                  <td><button className='edit-btn'>Edit</button></td>
                </tr>
                <tr>
                  <td>David Green</td>
                  <td>3004</td>
                  <td>Mobile App</td>
                  <td>2024-08-16</td>
                  <td>78</td>
                  <td>Well-designed but needs more testing</td>
                  <td><button className='edit-btn'>Edit</button></td>
                </tr>
                <tr>
                  <td>Eva White</td>
                  <td>3005</td>
                  <td>Secure Messaging App</td>
                  <td>2024-08-18</td>
                  <td>88</td>
                  <td>Great security features and user experience</td>
                  <td><button className='edit-btn'>Edit</button></td>
                </tr>
                <tr>
                  <td>Frank Black</td>
                  <td>3006</td>
                  <td>Task Manager</td>
                  <td>2024-08-20</td>
                  <td>72</td>
                  <td>Functional but lacks some features</td>
                  <td><button className='edit-btn'>Edit</button></td>
                </tr>
                <tr>
                  <td>Grace Lee</td>
                  <td>3007</td>
                  <td>Weather App</td>
                  <td>2024-08-22</td>
                  <td>80</td>
                  <td>Accurate forecasts and good design</td>
                  <td><button className='edit-btn'>Edit</button></td>
                </tr>
                <tr>
                  <td>Henry Adams</td>
                  <td>3008</td>
                  <td>Expense Tracker</td>
                  <td>2024-08-24</td>
                  <td>75</td>
                  <td>Functional but could use a more polished UI</td>
                  <td><button className='edit-btn'>Edit</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </NavBar>
    </div>
  );
}

export default Submission;
