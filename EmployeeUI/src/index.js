import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './Modules/Common/Components/Login';
import Navbar from './Modules/Common/Components/Navbar';
import SignUp from './Modules/Common/Components/SignUp';
import Home from './Modules/Common/Components/Home';
import { RouterProvider,createBrowserRouter, Outlet } from 'react-router-dom';
import AddEmployee from './Modules/Admin/Components/AddEmployee';
const Routes = [
  {path: '/', element : <App/>,
  children:[
    {path: 'login', element : <Login />},
    {path: 'sign-up', element : <SignUp />},
    {path: '/home', element : <Home/>},
  {path: '/emp', element : <AddEmployee/>},
  {path: '/emp/:id', element : <AddEmployee/>},
  ]
},
  
 ]
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={createBrowserRouter(Routes)}/>
  <Outlet/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
