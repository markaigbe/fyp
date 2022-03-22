import Axios from "axios";
import { useState } from 'react'
import React from 'react'

const HomePage = (props) => {
    const [data, setData] = useState(null)

    // testing if connected to express route
   const getUser = () => {
    Axios.get('http://localhost:8000/users/userValid', {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }})
        .then(res => {
            setData(res.data);
            console.log(res.data.user.username);
        })
        .catch(error =>{
            console.log(error);
        })
 };

    return (
        <div>
            <p>{props.text}</p>
            <button onClick={getUser}>{data ? <h1>Welcome {data.user.username}</h1> : "Click here"}</button>
        </div>
    )
}

export default HomePage
