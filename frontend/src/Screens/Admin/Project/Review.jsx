import React from 'react';
import NavBar from '../Navbar';
import '../Project/Review.css';

function Review() {
  return (
    <div>
      <NavBar activeSection="review">
        <div className="review-main">
          <p>Project Review Marks</p>
          <div className="tab">
          <table className='review-table'>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Student Id</th>
                <th>Project Name</th>
                <th>Project Marks</th>
                <th>Remarks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Alice Johnson</td>
                <td>1001</td>
                <td>AI Chatbot</td>
                <td>85</td>
                <td>Excellent work</td>
                <td><button className='edit-btn'>Edit</button></td>
              </tr>
              <tr>
                <td>Bob Smith</td>
                <td>1002</td>
                <td>Data Visualization Tool</td>
                <td>78</td>
                <td>Good effort</td>
                <td><button className='edit-btn'>Edit</button></td>
              </tr>
              <tr>
                <td>Bob Smith</td>
                <td>1002</td>
                <td>Data Visualization Tool</td>
                <td>78</td>
                <td>Good effort</td>
                <td><button className='edit-btn'>Edit</button></td>
              </tr>
              <tr>
                <td>Bob Smith</td>
                <td>1002</td>
                <td>Data Visualization Tool</td>
                <td>78</td>
                <td>Good effort</td>
                <td><button className='edit-btn'>Edit</button></td>
              </tr>
              <tr>
                <td>Bob Smith</td>
                <td>1002</td>
                <td>Data Visualization Tool</td>
                <td>78</td>
                <td>Good effort</td>
                <td><button className='edit-btn'>Edit</button></td>
              </tr>
              <tr>
                <td>Charlie Brown</td>
                <td>1003</td>
                <td>Web Scraper</td>
                <td>90</td>
                <td>Highly impressive</td>
                <td><button className='edit-btn'>Edit</button></td>
              </tr>
              <tr>
                <td>David Green</td>
                <td>1004</td>
                <td>Mobile App</td>
                <td>82</td>
                <td>Well-designed</td>
                <td><button className='edit-btn'>Edit</button></td>
              </tr>
              <tr>
                <td>Eva White</td>
                <td>1005</td>
                <td>Secure Messaging App</td>
                <td>88</td>
                <td>Great security features</td>
                <td><button className='edit-btn'>Edit</button></td>
              </tr>
              <tr>
                <td>Frank Black</td>
                <td>1006</td>
                <td>Task Manager</td>
                <td>76</td>
                <td>Needs improvement</td>
                <td><button className='edit-btn'>Edit</button></td>
              </tr>
              <tr>
                <td>Grace Lee</td>
                <td>1007</td>
                <td>Weather App</td>
                <td>80</td>
                <td>Accurate forecasts</td>
                <td><button className='edit-btn'>Edit</button></td>
              </tr>
              <tr>
                <td>Henry Adams</td>
                <td>1008</td>
                <td>Expense Tracker</td>
                <td>72</td>
                <td>Functional but basic</td>
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

export default Review;
