import React from 'react'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'



const ShowComments = () => {
    const [user, setUser] = useState('')
    const [comments, setComments] = useState([])

    // grabbing the token of logged in user, and storing in client
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

    // render list of all comments
    useEffect(() =>{
        Axios.get('http://localhost:8000/comments/getAllComments')
            .then(res => {
                setComments(res.data)
            })
            .catch(error =>{
                console.log(error);
            })
    }, [setComments])

    // axios request to delete post
    const deleteComment = (id)=>{
        Axios.delete(`http://localhost:8000/comments/deleteComment/${id}`)
        .then(alert('comment deleted'))
        .catch((err)=>{
            console.log(err)
        })
    }

    const cancelComment = () =>{
        window.location.href = '/homePage'
    }
    

    return (
        <div className='comment'>
        <div className='abovePostContent'></div>
        {/* print out list of posts */}
        <Container maxWidth="lg" id='commentContainer'>
            
            <Typography variant="h4" color="initial" id='commentHeader'> All Comments: </Typography>
            <div id='commentList'>
            {comments.sort(((a, b) => b-a)).map((val, key) =>{
            return <div id='postItem' key={key}> <h4>text: {val.text}</h4><h6>posted by: {user.user.username}</h6> 

                {/* <button onClick={() => deleteComment(val._id)}> delete </button> */}
            </div> 
            })}
            </div>


            <Button variant="outlined" color="primary" id='cancelPost' onClick={cancelComment}>
                Back 
            </Button>
                
        </Container>
        </div>
    )
}

export default ShowComments
