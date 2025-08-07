
import './App.css'
import { Routes, Route } from "react-router-dom";
import Welcome from './Components/Welcome'
import Login from './Components/Login'
import SignUp from './Components/Signup';
import Dashboard from './Dashboard';
// import FormModal from './DashComponents/FormModal';
import AuthorForm from './DashComponents/FormModal';
import ScrollTop from './DashComponents/ScrollTop';
function App() {
  
  return (
    <>
    <ScrollTop/>
    <Routes>
      <Route path='/' element={<Welcome/>}/>
      <Route path='/login' element={<Login/>}/>     
      <Route path='/signup' element={<SignUp/>}/>     
      <Route path='/dashboard' element={<Dashboard/>}/>     
      <Route path="/form" element={<AuthorForm isEdit={false} open={true} onClose={() => {}} />} />
    </Routes>
    </>
  )
}

export default App
