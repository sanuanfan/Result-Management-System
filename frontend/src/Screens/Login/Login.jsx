import React, { useState } from 'react';
import '../Login/Login.css';
import axios from 'axios';

function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(userName, password);
      const res = await axios.post('http://localhost:5000/login', { userName, password });

      if (res.data.message === 'success') {
        window.location.href = '/admin/home';
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      console.log('Login error:', err.response ? err.response.data.message : err.message);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className='maincontainer'>
      <div className='left-container'></div>
      <div className='right-container'>
        <div className="sub">
          <h2>Get Secured Access to Admin Dashboard</h2>
          <form onSubmit={handleLogin} method='POST'>
            <div className='form'>
              <div className='user'>
                <input type="text" placeholder='Username' name='username' required
                  onChange={(e) => setUserName(e.target.value)} />
                <i className='bx bx-user' id='icon'></i>
              </div>
              <div className='user'>
                <input type="password" placeholder='Password' name='password' required
                  onChange={(e) => setPassword(e.target.value)} />
                <i className='bx bxs-key' id='icon'></i>
              </div>
            </div>
            <div className="button">
              <input type="submit" value="Login" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
