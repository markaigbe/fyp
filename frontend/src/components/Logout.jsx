import axios from 'axios'
import React from 'react'
import Button from '@mui/material/Button'

const Logout = () => {
    // removes the token of the logged in user from the client, logging them out. 
    const logoutUser = () => {
        axios.get('http://localhost:8000/users/userValid', {
            headers: {
                "x-access-token": localStorage.removeItem("token")
            }})
            .then(res => {
                window.location.href = '/'
                console.log(res);
            })
            .catch(error =>{
                console.log(error);
            })
    }

    return (
        <div>
            <Button variant='contained' color='secondary' onClick={logoutUser}>
              Logout
            </Button>
        </div>
    )
}

export default Logout
