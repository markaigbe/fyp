import React from 'react'
import TextField from '@mui/material/TextField'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Axios from 'axios'
import PostAddIcon from '@mui/icons-material/PostAdd';
import Avatar from '@mui/material/Avatar';


const Post = () => {
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

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

  const submitPost = (e) => {
    // testing if connected to express route
    axios({
        method: "POST",
        data: {
          title: title,
          content: content,
        },
        withCredentials: true,
        url: 'http://localhost:8000/posts/submit'
    })
    .then(res => {
        if(res.data){
            alert('Post Successfully Created')
            window.location.href = '/homepage'
        }
    })
    .catch(err => {
        console.log(err)
    })
  }

  const cancelPost = () =>{
    window.location.href = '/homePage'
  }

  return (
    <div>
    <div className='abovePostContent'></div>
    <Avatar sx={{ ml:50, mb: -15, bgcolor: '#ff833a' }}>
          <PostAddIcon />
    </Avatar>
    <div className='post'>

    <Typography mt={7} mb={0} variant="h3" color='black'>
      {user ?<Typography variant="h5" color="initial" id='submitPostTitle'>[{user.user.username}] Create a Post</Typography> : 'Load Username'}
    </Typography>
    
        <TextField id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={'Title'}
          
        /><br /><Typography variant="body1" color="initial"></Typography><br />
        <TextField
          id="content"
          variant='outlined'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          multiline={true}
          rows={5}
          placeholder={'Text (optional)'}
          
        /><br />
        <Button variant="outlined" color="primary" id='submitPost' onClick={submitPost}>
          Submit
        </Button>

        <Button variant="outlined" color="primary" id='cancelPost' onClick={cancelPost}>
          Cancel 
        </Button>
        
    </div>
    </div>
  )
}

export default Post