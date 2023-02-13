import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import logo from '../../../Assests/images/logoHR.png'
import {isAdmin } from '../../../utils'
export default ({controls=false}) => {
const [token,setToken]=useState(localStorage.getItem('token'))
const [admin,setAdmin]=useState(false)
const {pathname} =useLocation()
    useEffect(() => {
        setToken(localStorage.getItem('token'));
        if(token){
        setAdmin(isAdmin(token))
        }
    },[token,pathname])
    console.log({token})


console.log(admin)
    return  <div>
    <nav class="navbar bg-primary">
        <div class="container-fluid">
            <Link class="navbar-brand" to={token!==null?"/home":"/"}>
                <img src={logo} alt="logo" width="50" height="45" />
            </Link>
        { token? <div class="d-flex" role="button">
                <button class="btn btn-outline" type="link">
                    <Link class="nav-link" to="/home">
                        EMPLOYEE DATA BANK
                    </Link>
                </button>
               { admin&&<button class="btn btn-outline" type="link" >
                    <Link class="nav-link" to="/emp">
                        ADD EMPLOYEE
                    </Link>
                </button>}
                <button class="btn btn-outline" type="link" >
                    <Link class="nav-link" to="/" onClick={()=>localStorage.clear()}>
                       SIGN-OUT
                    </Link>
                </button>
            </div>:<div class="d-flex">
            <button class="btn btn-outline" type="link">
                    <Link class="nav-link" to="/login">
                        LOGIN
                    </Link>
                </button>
                <button class="btn btn-outline" type="link" >
                    <Link class="nav-link" to="/sign-up">
                        SIGNUP
                    </Link>
                </button>
                </div>}
        </div>
    </nav>
</div>
}