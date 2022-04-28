const express = require('express')
const router = express.Router()
const {User} = require('../models/userModel')
const {deleteUser,getUsers, getOneUserID, userValid, verifyJWT, loginUser, registerUser} = require('../controllers/user')
const {protect} = require('../middleware/auth')


// check if auth is working
router.get('/userValid', verifyJWT, userValid)

// register/login
router.post('/register', registerUser)
router.post('/login', loginUser)

// delete user
router.delete('/deleteUser/:id', deleteUser)

// read all users
router.get('/getUsers', getUsers)

// read one user
router.get('/getOneUser/:id', protect, getOneUserID)


module.exports = {
  router,
  verifyJWT,
}