const express = require('express')
const router = express.Router()
const commentModel = require('../models/commentModel')

router.post('/submit', async (req,res) =>{
    const Comment = new commentModel({
        text: req.body.comment.text,
    })
    const newComment = await Comment.save()
    console.log('new comment created: ' + newComment)
    res.send({text: req.body.text})
})

router.get('/', async (req,res) =>{
   res.send('hello')
})


module.exports = router;