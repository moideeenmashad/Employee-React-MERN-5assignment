import axios from "axios";
let token = localStorage.getItem('token')
const Axios = axios.create(
    {
        baseURL:'http://localhost:3001/',
        headers: {
            'Authorization': token?`Bearer ${token}` :""
          }
    }
)


export default Axios