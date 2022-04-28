import React from 'react'
import TextField from '@mui/material/TextField'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Axios from 'axios'
import PostAddIcon from '@mui/icons-material/PostAdd';
import Avatar from '@mui/material/Avatar'

const Comment = () => {
  const [user, setUser] = useState('')
  const [text, setText] = useState('')

    useEffect(() =>{
        Axios.get('http://localhost:8000/users/userValid', {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }})
            .then(res => {
                setUser(res.data);
                console.log(res.data.user.username)
            })
            .catch(error =>{
                console.log(error);
            })
        }, [setUser])
    
    const submitComment = (e) => {
        // testing if connected to express route
        axios({
            method: "POST",
            data: {
                text: text,
            },
            withCredentials: true,
            url: 'http://localhost:8000/comments/submit'
        })
        .then(res => {
            if(res.data){
                alert('Comment Successfully Created')
                window.location.href = '/homepage'
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    const cancelComment = () =>{
        window.location.href = '/homePage'
    }
    

    return (
        <div className='comment'>
            <div className='abovePostContent'></div>
            <Avatar sx={{ ml:70, mb: -13, bgcolor: '#ff833a' }}>
                <PostAddIcon />
            </Avatar>
            <div className='post'>
        
            <Typography ml={10} mt={7} mb={0} variant="h3" color='black'>
            {user ?<Typography variant="h5" color="initial" id='submitPostTitle'>[{user.user.username}] Create a Comment</Typography> : 'Load Username'}
            </Typography>
                    <TextField
                    id="comment"
                    variant='outlined'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    multiline={true}
                    rows={5}
                    placeholder={'Text'}
                    
                    /><br />
                <Button variant="outlined" color="primary" id='submitPost' onClick={submitComment}>
                Submit
                </Button>
        
                <Button variant="outlined" color="primary" id='cancelComment' onClick={cancelComment}>
                Cancel 
                </Button>
                
            </div>
        </div>
    )
}

export default Comment
