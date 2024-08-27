import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Attendence from './Attendance/Attendence'
import AdminDashboard from './AdminDashboard/AdminDashboard'

function AdminRoutes() {
  return (
    <div>
            <Routes>
                <Route path='home' element={<AdminDashboard />} />
                <Route path='attendance' element={<Attendence />}/>
            </Routes>
    </div>
  )
}

export default AdminRoutes
