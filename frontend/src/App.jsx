import react from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'boxicons/css/boxicons.min.css';
import Login from './Screens/Login/Login'
import HomeStudent from './Screens/Student/HomeStudent'
import 'boxicons/css/boxicons.min.css';
import AdminRoutes from './Screens/Admin/AdminRoutes';


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/admin/*' element={<AdminRoutes />} />
          <Route path='/student' element={<HomeStudent />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
