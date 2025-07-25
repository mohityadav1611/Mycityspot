
import './App.css'
import { Routes, Route } from "react-router-dom";
import Welcome from './Components/Welcome'
import Login from './Components/Login'
import SignUp from './Components/Signup';

function App() {
  
  return (
    <>
    <Routes>
      <Route path='/' element={<Welcome/>}/>
      <Route path='/Login' element={<Login/>}/>     
      <Route path='/signup' element={<SignUp/>}/>     
    </Routes>
    </>
  )
}

export default App
