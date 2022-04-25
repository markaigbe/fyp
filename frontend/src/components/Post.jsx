import React from 'react'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import axios from 'axios'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'


const Post = () => {
  const [title, setTitle] = useState('empty')
  const [content, setContent] = useState('empty')

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

  return (
    <div className='post'>
        <Typography variant="h3" color="initial" id='submitPostTitle'>Create a Post</Typography>
          id="title"
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
          Submit post
        </Button>
    </div>
  )
}

export default Post