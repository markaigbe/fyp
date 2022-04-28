const express = require('express')
const router = express.Router()
const {Comment} = require('../models/commentModel')

router.post('/submit', async (req,res) =>{
    const comment = new Comment({
        text: req.body.text,
    })
    const newComment = await comment.save()
    console.log('new comment created: ' + newComment)
    res.send({text: req.body.text})
})

router.get('/getAllComments', async (req,res) =>{
    Comment.find((err, result) =>{
        if(err) {res.send(err)}

        res.send(result)
    }).sort({'date': -1})
})

router.delete('/deleteComment', async (req,res) =>{
    const id = req.params.id
    
    await Comment.findByIdAndRemove(id).exec()
    
    res.send('comment deleted')
})

module.exports = router;