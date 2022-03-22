import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";

const Login = () => {
    const [logUsername, setLogUsername] = useState('')
    const [logPassword, setLogPassword] = useState('')
    const [loggedInStatus, setLoggedInStatus] = useState(false)



    const loginUser = () => {
        // testing if connected to express route
        axios({
            method: "POST",
            data: {
                username: logUsername,
                password: logPassword,
            },
            url: 'http://localhost:8000/users/login'
        })
        .then(res => {
            if(res.data.authenticated === false){
                alert('invalid username/passoword')
                setLoggedInStatus(false)
            }
            else{
                alert('Successfully logged in')
                window.location.href = '/homepage'
                localStorage.setItem("token", res.data.accessToken)
                setLoggedInStatus(true)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    const userAuthenticated = () => {
        axios.get('http://localhost:8000/users/userValid', {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }})
        .then(res => {
            console.log(res);
        })
        .catch(error =>{
            console.log(error);
        })
    }

    return (
        <div>
            <h1>Login Page</h1><br />
            <label>username</label>
                <input type="text" id="username" name="username" value={logUsername} onChange={(e) => setLogUsername(e.target.value)} required></input><br></br>

                <label>passowrd</label>
                <input type="password" id="password" name="password" value={logPassword} onChange={(e) => setLogPassword(e.target.value)} required></input><br />
                <button onClick={loginUser}>sign up</button>         

            <br />
            <Link to="/" type="button"> register here</Link>

            {loggedInStatus && (
                <button onClick={userAuthenticated}>Check if Authenticated</button>
            )}
        </div>
    )
}

export default Login
