
import './App.css';
import { useEffect } from 'react';
import { Outlet, redirect } from "react-router-dom";
import Navbar from './Modules/Common/Components/Navbar';
import Login from './Modules/Common/Components/Login';




function App() {
  const token = localStorage.getItem('token')

console.log({token})
useEffect(()=>{
  if (token) {
     redirect("/login");
  }
},[token])

  return (
   <div>
    
    <Navbar controls/>
   <Outlet/>
   
   </div>
  );
}

export default App;
