
import {  useState } from "react";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import Button from "../../../Components/Button";
import { Input } from "../../../Components/Form";
import Axios from "../../../request";
import Container from "../Container";

const Login= () => {
        const [loginData, setLoginData] = useState({})
        const navigate =useNavigate()
        const path =useLocation()
        console.log({path})
        const loginApi = (data) => {
            Axios.post("sign-in",data)
                .then((response) => {
                    console.log({response});
                    if(response.data.token){
                        localStorage.setItem("token", response.data.token);
                        navigate('/home')
                    }else{
                        alert(response.data.message)
                    }
                })
                .catch(err=>{console.log({err})});
        };
    
       

const handleSubmit = (e)=>{
e.preventDefault()
    loginApi(loginData);
}
const inputHandler = (event) => {
    const { name, value } = event.target
    setLoginData(
        (preState) => ({
            ...preState,
            [name]: value
        })
    )
}

  return (<Container heading = "LOGIN">
      <form className = "row g-3 needs-validation" onSubmit={handleSubmit}>
        <Input label="email" name="email"   onChange={inputHandler} />
        <Input type = "password" label="Password" name="password" onChange={inputHandler}/>
        <Button label="LOGIN" onChange={inputHandler}/>
      <Link to='sign-up'>sign-up</Link>
      <p>Admin Login:
username : admin@gmail.com
password : admin123
<br/>
User Login:
SignUp and Login with Credential</p>
      </form>
      
    </Container>
  );
};

export default Login;


