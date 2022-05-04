import React from 'react'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar';
import ErrorIcon from '@mui/icons-material/Error';
import { Link } from 'react-router-dom'

const Page404 = () => {



  return (
    <div className='Login'>
    <div className='aboveContainer'></div>

        <Container maxWidth='xs' className='container'>
            <Grid container rowSpacing={0} justifyContent='end' alignContent={'center'} direction='column'>
                <Typography mt={6} mb={5} variant="h5" color='black'>
                    <Avatar sx={{ ml:15, mb: 3, bgcolor: '#ff833a' }}>
                        <ErrorIcon />
                    </Avatar>
                    Error 404: Page not found
                </Typography>
                <Typography variant="body1" color="initial">Redirect to <Link to='/login'>Login</Link></Typography>
            </Grid>
        </Container>
</div>
  )
}

export default Page404