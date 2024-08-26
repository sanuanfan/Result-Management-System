import React from 'react'
import '../Login/Login.css'

function Login() {
  return (
    <div className='maincontainer'>
      <div className='left-container'></div>
      <div className='right-container'>
        <div className="sub">
          <h2>Get Exclusive access to Admin Dashboard</h2>
          <form action="">
            <div className='form'>
              <div className='user'>
                <input type="text" placeholder='Username' />
                <i className='bx bx-user' id='icon'></i>
              </div>
              <div className='user'>
                <input type="password" placeholder='Password' />
                <i className='bx bxs-key' id='icon'></i>
              </div>
            </div>
            <div className="button">
              <input type="button" value="Login" />

            </div>


          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
