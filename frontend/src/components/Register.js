import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Axios from "axios";
import Button from '@mui/material/Button'


const Register = () => {
    const [regUsername, setRegUsername] = useState('')
    const [regPassword, setRegPassword] = useState('')

    const submitUser = (event) => {
        event.preventDefault()
        // testing if connected to express route
        Axios({
            method: "POST",
            data: {
                username: regUsername,
                password: regPassword,
            },
            withCredentials: true,
            url: 'http://localhost:8000/users/register'
        })
        .then(res => {
            if(res.data){
                alert('Successfuly Registered')
                window.location.href = '/login'
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="Register">
            <h1>Register Page</h1><br />
                <label>username</label>
                <input type="text" id="username" name="username" value={regUsername} onChange={(e) => setRegUsername(e.target.value)} required></input><br></br>

                <label>passowrd</label>
                <input type="password" id="password" name="password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} required></input><br />

                {/* if theres no username inputted, pass the onclick value as null - do nothing */}
                <Button onClick={regUsername ? submitUser : null} variant='contained'>
                    Sign up
                </Button>       

            <br />
            <Link to="/login" type="button"> Login here</Link>

        </div>
    )
}

export default Register