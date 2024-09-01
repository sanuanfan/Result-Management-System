import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from './AdminDashboard/AdminDashboard'
import Attendance from './Attendance/Attendance'
import Review from './Project/Review'
import Assessment from './Project/Assessment'
import Submission from './Project/Submission'
import LinkedIn from './LinkedIn/LinkedIn'

function AdminRoutes() {
  return (
    <div>
      <Routes>
        <Route path='home' element={<AdminDashboard />} />
        <Route path='attendance' element={<Attendance />} />
        <Route path='review' element={<Review />} />
        <Route path='assessment' element={<Assessment />} />
        <Route path='submission' element={<Submission />} />
        <Route path='linkedin' element={<LinkedIn />} />
      </Routes>
    </div>
  )
}

export default AdminRoutes
