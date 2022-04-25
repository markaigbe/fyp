const express = require('express')
const router = express.Router()
const postModel = require('../models/postModel')


router.post('/submit', async (req,res) =>{
    const Post = new postModel({
        title: req.body.title,
        content:req.body.content
    })
    const newPost = await Post.save()
    console.log('new post created: ' + newPost)
    res.send({title: req.body.title, content: req.body.content})
})

router.get('/getPosts', (req,res) =>{
    postModel.find({}, function(err, posts) {
        var postMap = {};
    
        posts.forEach(function(post) {
            postMap[post.title] = post;
        });
    
        res.send(postMap);  
      });
})

router.get('/', async (req,res) =>{
   res.send('hello')
})


module.exports = router;