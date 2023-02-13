import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../../Components/Button";
import { Input } from "../../../Components/Form"
import Axios from "../../../request";
import Container from "../../Common/Container"

export default () => {
  const {id} =useParams()
  console.log({id})
  const[empData,setEmpData]=useState({
    name:'',
    location:'',
    salary:0,
    designation:''
  });

  useEffect(() => {
    if(id){
      Axios.get(`emp/${id}`)
      .then((response) => {
        setEmpData(response.data.data)
       
      })
      .catch(err=>console.log({err}));
    }
  
 
  }, [id])
  
  const handleSubmit =(e)=>{
    e.preventDefault()
    if(id){
      Axios.put("update-emp",empData)
      .then((response) => {
        alert('update success')
      })
      .catch(err=>console.log({err}));

    }else{
      Axios.post("create-emp",empData)
              .then((response) => {
                alert('save success')
              })
              .catch(err=>console.log({err}));
    
    }
setEmpData({
  name:'',
    location:'',
    salary:0,
    designation:''
})
  }
  const inputHandler = (event) => {
    const { name, value } = event.target
    setEmpData(
        (preState) => ({
            ...preState,
            [name]: value
        })
    )
}
  return<Container>
<form className = "row g-3 needs-validation" onSubmit={handleSubmit}>
    <Input label='Name' name="name" onChange={inputHandler} value={empData.name} />
    <Input label='Designation' name="designation" onChange={inputHandler} value={empData.designation}/>
    <Input label='Location' name="location" onChange={inputHandler} value={empData.location}/>
    <Input label='Salary' name="salary" onChange={inputHandler} value={empData.salary}/>
    <Button label={id?'Update' :'Save'} onChange={inputHandler} value={empData.name}/>
  </form>
</Container>
 }