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




const HomePage = (props) => {
    const [user, setUser] = useState(null)
    const [post, setPost] = useState(null)
    const [isVisible, setIsVisible] = useState(false)

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

    // grabbing the token of logged in user, and storing in client
    useEffect(() =>{
        Axios.get('http://localhost:8000/posts/getPosts', {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }})
            .then(res => {
                setPost(res.data)
                console.log(res.data.empty.content)
            })
            .catch(error =>{
                console.log(error);
            })
        }, [setPost])
        

    return (

        <div className='Homepage'>
            {!!isVisible && <HomeScreen />}
            <div className="aboveMainContent">
                <Container maxWidth="lg">
                    <Grid container spacing={1} display={'flex'}>
                        <Grid item xs={10} className='gridHeader'>
                            <Typography variant="h6" color="initial">Homepage</Typography>
                            <a href=""><Typography variant="body1" color="initial">Your Posts</Typography></a>
                            <a href=""><Typography variant="body1" color="initial">Your Comments</Typography></a>
                        </Grid>

                        <Grid item xs={2} className='gridHeader'>
                            {user ? <Typography>Welcome [{user.user.username}]</Typography> : "Load Username"}
                            <Button variant="outlined" color="primary" onClick={() =>{setIsVisible(!isVisible)}}> Make a post </Button>
                        </Grid>

                        <Grid item xs={10} className='grid'>
                            <div className="test1">
                                {!!isVisible && <Post /> }
                               {!isVisible && <Typography variant="h5" color="initial">Main feed: </Typography>}<br />

                               <a href=""><Typography variant="body1" color="initial">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed dapibus orci, eget iaculis odio.</Typography></a><br />
                               <a href=""><Typography variant="body1" color="initial">Fusce auctor vestibulum velit vitae vestibulum. Vestibulum sagittis ipsum id nisl sagittis, sed dapibus eros porttitor.</Typography></a><br />
                               <a href=""><Typography variant="body1" color="initial">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at feugiat turpis. Mauris tincidunt ac quam in dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit</Typography></a><br />
                               <a href=""><Typography variant="body1" color="initial">Fusce auctor vestibulum velit vitae vestibulum. Vestibulum sagittis ipsum id nisl sagittis, sed dapibus eros porttitor</Typography></a><br />
                               <a href=""><Typography variant="body1" color="initial">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at feugiat turpis. Mauris tincidunt ac quam in dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit</Typography></a><br />
                               <a href=""><Typography variant="body1" color="initial">Vivamus vitae libero est. Maecenas sed gravida ligula. Aliquam erat volutpat.</Typography></a><br />
                               <a href=""><Typography variant="body1" color="initial">Nullam et libero nec urna faucibus fringilla. Mauris in metus sem.</Typography></a><br />
                               <a href=""><Typography variant="body1" color="initial">Phasellus commodo lacus vitae turpis finibus, vitae cursus augue volutpat.</Typography></a><br />
                               <a href=""><Typography variant="body1" color="initial">Nam consectetur lorem libero, ac semper purus vulputate et. Donec non magna at nisl porttito</Typography></a><br />
                               <a href=""><Typography variant="body1" color="initial">Curabitur dapibus sollicitudin lorem. Donec interdum est fringilla elit condimentum, sed laoreet neque aliquet. Maecenas dictum porttitor convallis</Typography></a><br />
                               <a href=""><Typography variant="body1" color="initial">hasellus tristique iaculis magna ac pellentesque. Duis ipsum arcu, tincidunt nec pharetra at, </Typography></a><br />
                               <a href=""><Typography variant="body1" color="initial">faucibus odio. Proin sit amet arcu mollis, egestas nibh nec, facilisis risus. Mauris condimentum lacus in</Typography></a><br />
                               <a href=""><Typography variant="body1" color="initial">Quisque maximus volutpat ipsum, eu porttitor turpis cursus ac. Ut volutpat egestas viverra. </Typography></a><br />
                               <a href=""><Typography variant="body1" color="initial">Suspendisse porttitor varius ipsum eu ornare. </Typography></a><br />
                            </div>
                        </Grid>

                        <Grid item xs={2} className='grid'>
                            <div className="test">
                                <Typography variant="body1" color="initial" ml={5}>
                                    Friends List
                                </Typography><br />
                                
                                <li>empty</li>
                                <li>empty</li>
                                <li>empty</li>
                                <li>empty</li>
 
                            </div>
                        </Grid>
                        <div className="LogoutButton"><Logout /></div>
                        <Grid item xs={12} className='gridFooter'>
                            Developed by Mark Aigbe
                        </Grid>
                    </Grid>
                    <Grid container spacing={0}>
                    
                    </Grid>
                </Container>
            </div>
        </div>
    )
}

export default HomePage
