import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from '../../../request';
import { isAdmin } from '../../../utils';
import Container from '../Container';

const Home = () => {
    const [empData, setEmpData] = useState([])
    const navigate =useNavigate()
const token =localStorage.getItem('token')

    const handleFetch=()=>{
        Axios.get("emp-list")
            .then((response) => {
                console.log({response});
                setEmpData(response.data.data||[])
            })
            .catch();
    }
        useEffect(() => {
            handleFetch()

        }, [])
        const handleDelete=(id)=>{
            Axios.post("delete-emp",{_id:id})
            .then((response) => {
                handleFetch()
            }).catch(err=>console.log({err}))
        }
  return (
    <div><Container heading='Employee List'>
          
            <div className='bordered'>
                <div class="table-responsive-md ">
                    <table class="table table-hover table-bordered">
                        <thead class="table-head">
                            <tr style={{size : '25px'}}>
                                <th scope="col">name</th>
                                <th scope="col">designation</th>
                                <th scope="col">salary</th>
                              {isAdmin(token)&& <th scope="col">actions</th>}
                            </tr>
                        </thead>
                        {empData.map((value, key) => {
                            return (

                                <tbody className='table-group-divider'>
                                    <tr>
                                        {/* <th scope="row">{value.id}</th> */}
                                        <td>{value.name}</td>
                                        <td>{value.designation}</td>
                                        <td>{value.salary}</td>
                        {          isAdmin(token)&&      <td><button onClick={()=>navigate(`/emp/${value._id}`)}>Edit</button><button onClick={()=>handleDelete(value._id)}>delete</button></td>}
                                    </tr>
                                </tbody>
                            )
                        })}


                    </table>
                </div>
            </div>


    </Container></div>
  )
}

export default Home