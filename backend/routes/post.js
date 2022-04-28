const express = require('express')
const router = express.Router()
// using post controller
const {submitPost, getMyPost, updatePost, deletePost, getAllPosts} = require('../controllers/post')
const {protect} = require('../middleware/auth')

// calling controllers and assinging a route function and path
// appliying auth.js middleware to ensure each post request requires a authorised user
router.post('/submit', submitPost)
router.get('/getMyPost', getMyPost)
router.get('/getAllPosts', getAllPosts)
router.put('/updatePost' ,updatePost)
router.delete('/deletePost/:id', deletePost)


module.exports = router;