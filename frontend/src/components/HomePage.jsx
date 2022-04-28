import Axios from "axios";
import { useEffect, useState } from 'react'
import React from 'react'
import Logout from "./Logout";
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Post from "./Post";
import HomeScreen from "./HomeScreen";
import { Link } from "@mui/material";




const HomePage = (props) => {
    const [user, setUser] = useState(null)
    const [post, setPost] = useState([])
    const [isVisible, setIsVisible] = useState(false) 
    const [editTitle, setEditTitle] = useState('')

    useEffect(() => console.log('state', isVisible), [isVisible])

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

    // render list of all posts
    useEffect(() =>{
        Axios.get('http://localhost:8000/posts/getAllPosts')
            .then(res => {
                setPost(res.data)
                
            })
            .catch(error =>{
                console.log(error);
            })
    }, [setPost])
    
    // // axios request to update post
    // const changePost = (id) =>{
    //     Axios.put('http://localhost:8000/posts/updatePost',{id: id, title: editTitle})
    // }

    // axios request to delete post
    const deletePost = (id)=>{
        Axios.delete(`http://localhost:8000/posts/deletePost/${id}`)
        .then(alert('post deleted'))
        .catch((err)=>{
            console.log(err)
        })
    }

    const toComments = () => {
        window.location.href = 'showComments'
    }
    const toMakeComments = () => {
        window.location.href = 'comment'
    }


    return (

        <div className='Homepage'>
            {!!isVisible && <HomeScreen /> && <Post />}
            <div className="aboveMainContent">
            {!isVisible && <Container maxWidth="lg">
                    <Grid container spacing={1} display={'flex'}>
                        <Grid item xs={10} className='gridHeader'>
                            <Typography variant="h6" color="initial">Homepage</Typography><br />
                            {user ? <Typography variant='h3'>Welcome [{user.user.username}]</Typography> : "Load Username"}
                        </Grid>

                        <Grid item xs={2} className='gridHeader'>

                            <Button variant="outlined" color="primary" onClick={toComments}> show comments</Button>
                            <Button variant="outlined" color="primary" onClick={() =>{setIsVisible(!isVisible)}}> Make a post </Button>
                            <Button variant="outlined" color="primary" onClick={toMakeComments}> Make a comment </Button>
                            <div className="LogoutButton"><Logout /></div>
                        </Grid>

                        <Grid item xs={12} className='grid'>
                            <div className="test1">
                               {!isVisible && <Typography variant="h5" color="initial">Main feed </Typography>}<br />

                                {/* print out list of posts */}
                                <div id='postList'>
                                    {post.sort(((a, b) => b-a)).map((val, key) =>{
                                        return <div id='postItem' key={key}> <h4>title: {val.title}</h4> <h5>SubText: {val.content}</h5> <h6>posted by: {val.user}</h6> 
                                            {/* <input type='text' placeholder='Edit Post Name' value={editTitle} onChange={(e) => setEditTitle(e.target.value)}  /> 
                                            <button onClick={() => changePost(val._id)}>edit</button>  */}

                                            <button onClick={() => deletePost(val._id)}> delete </button>
                                        </div> 
                                })}
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} className='gridFooter'>
                            Developed by Mark Aigbe
                        </Grid>
                    </Grid>
                </Container>}
            </div>
        </div>
    )
}

export default HomePage
