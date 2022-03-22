import axios from 'axios'
import React from 'react'

const Logout = () => {
    axios.delete('http://localhost:8000/users/logout')

    return (
        <div>
            
        </div>
    )
}

export default Logout
