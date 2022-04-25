import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Axios from "axios";
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'


const Register = () => {
    // fill with default data to prevent server crash
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
            <div className='aboveContainer'></div>
            
            <Container maxWidth='xs' className='container'>
                <Grid container rowSpacing={0} justifyContent='end' alignContent={'center'} direction='column'>
                    <Typography mt={8} mb={8} variant="h3" color='black'>
                        <Avatar sx={{ ml:8, mb: 2, bgcolor: '#ff833a' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        Register
                    </Typography>
                </Grid>

                <Grid display={'flex'} container spacing={0} direction='column' justifyContent='center' style={{border: 1,}}>
                    <TextField
                    id="username"
                    label="username"
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    type='text'
                    /><br />

                    <TextField
                    id="password"
                    label="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    type='password'
                    /><br />

                    {/* if theres no username inputted, pass the onclick value as null - do nothing */}
                    <Button onClick={regUsername ? submitUser : null} variant='contained' color='primary'>
                        Sign up
                    </Button><br />

                    Already registered? <Link to="/login" type="button"> Login here</Link>
                </Grid>
            </Container>
        </div>
    )
}

export default Register