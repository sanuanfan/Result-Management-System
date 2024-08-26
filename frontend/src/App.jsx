import react from 'react'
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import 'boxicons/css/boxicons.min.css';
import Login from './Screens/Login/Login'
import HomeStudent from './Screens/Student/HomeStudent'
import AdminDashboard from './Screens/Admin/AdminDashboard'
import 'boxicons/css/boxicons.min.css';


function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/student' element={<HomeStudent />} />
      </Routes>
    </Router>
      
    </>
  )
}

export default App
