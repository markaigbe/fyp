import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar';
import LoginIcon from '@mui/icons-material/Login';


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
            console.log(res.data);
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
        <div className='Login'>
            <div className='aboveContainer'></div>

                <Container maxWidth='xs' className='container'>
                    <Grid container rowSpacing={0} justifyContent='end' alignContent={'center'} direction='column'>
                        <Typography mt={8} mb={8} variant="h3" color='black'>
                            <Avatar sx={{ ml:5, mb: 2, bgcolor: '#ff833a' }}>
                                <LoginIcon />
                            </Avatar>
                            Login
                        </Typography>
                    </Grid>

                    <Grid display={'flex'} container spacing={0} direction='column' justifyContent='center' style={{border: 1,}}>
                        <TextField
                        id="username"
                        label="username"
                        value={logUsername}
                        onChange={(e) => setLogUsername(e.target.value)}
                        type='text'
                        /><br />

                        <TextField
                        id="password"
                        label="password"
                        value={logPassword}
                        onChange={(e) => setLogPassword(e.target.value)}
                        type='password'
                        /><br />

                        <Button variant='contained' color='primary' onClick={loginUser}>sign in</Button>         

                        <br />
                        <Typography variant="body1" color="initial">Dont have an account? <Link to="/" type="button">register here</Link></Typography> 

                        {loggedInStatus && (
                            <button onClick={userAuthenticated}>Check if Authenticated</button>
                        )}
                    </Grid>
                </Container>
        </div>
    )
}

export default Login