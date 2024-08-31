import React from 'react';
import NavBar from '../Navbar';
import './Assessment.css';

function Assessment() {
  return (
    <div>
      <NavBar activeSection="assessment">
        <div className="assessment-main">
          <p>Assessment Marks</p>
          <div className="tab">
          <table className='assessment-table'>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Student Id</th>
                <th>First Attempt</th>
                <th>Second Attempt</th>
                <th>Total Score</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Alice Johnson</td>
                <td>2001</td>
                <td>75</td>
                <td>85</td>
                <td>160</td>
                <td><button className='edit-btn'>Edit</button></td>
              </tr>
              <tr>
                <td>Bob Smith</td>
                <td>2002</td>
                <td>68</td>
                <td>74</td>
                <td>142</td>
                <td><button className='edit-btn'>Edit</button></td>
              </tr>
              <tr>
                <td>Charlie Brown</td>
                <td>2003</td>
                <td>82</td>
                <td>90</td>
                <td>172</td>
                <td><button className='edit-btn'>Edit</button></td>
              </tr>
              <tr>
                <td>David Green</td>
                <td>2004</td>
                <td>70</td>
                <td>78</td>
                <td>148</td>
                <td><button className='edit-btn'>Edit</button></td>
              </tr>
              <tr>
                <td>Eva White</td>
                <td>2005</td>
                <td>85</td>
                <td>88</td>
                <td>173</td>
                <td><button className='edit-btn'>Edit</button></td>
              </tr>
              <tr>
                <td>Frank Black</td>
                <td>2006</td>
                <td>60</td>
                <td>65</td>
                <td>125</td>
                <td><button className='edit-btn'>Edit</button></td>
              </tr>
              <tr>
                <td>Grace Lee</td>
                <td>2007</td>
                <td>77</td>
                <td>80</td>
                <td>157</td>
                <td><button className='edit-btn'>Edit</button></td>
              </tr>
              <tr>
                <td>Grace Lee</td>
                <td>2007</td>
                <td>77</td>
                <td>80</td>
                <td>157</td>
                <td><button className='edit-btn'>Edit</button></td>
              </tr>
              <tr>
                <td>Grace Lee</td>
                <td>2007</td>
                <td>77</td>
                <td>80</td>
                <td>157</td>
                <td><button className='edit-btn'>Edit</button></td>
              </tr>
              <tr>
                <td>Grace Lee</td>
                <td>2007</td>
                <td>77</td>
                <td>80</td>
                <td>157</td>
                <td><button className='edit-btn'>Edit</button></td>
              </tr>
              <tr>
                <td>Henry Adams</td>
                <td>2008</td>
                <td>90</td>
                <td>92</td>
                <td>182</td>
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

export default Assessment;
