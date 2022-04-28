const {Post} = require('../models/postModel')
const {User} = require('../models/userModel')

// submit post to DB
const submitPost = async (req,res) =>{
    // create a new post using post model
    const post = await Post.create({
        title: req.body.title,
        content:req.body.content,
    })

    // save to db
    const newPost = await post.save()
    console.log('new post created: ' + newPost)
    res.send({title: req.body.title, content: req.body.content})
}

// get posts for logged in user
const getMyPost = async (req,res) =>{
    const posts = await Post.find({user: req.user.username})
    console.log(posts);
    res.json(posts)
}

// get all posts and sort by most recently created
const getAllPosts = async (req,res)=>{
    Post.find((err, result) =>{
        if(err) {res.send(err)}

        res.send(result)
    }).sort({'date': -1})
}


const updatePost = async (req,res) =>{
    const newTitle = req.body.title
    const id = req.body.id

    try {
        Post.findById(id, (updatedPost) =>{
            updatedPost.title = newTitle
            updatedPost.save()
        })
    } catch (error) {
        console.log(error)
    }
}

const deletePost = async(req,res) =>{
    const id = req.params.id
    
    await Post.findByIdAndRemove(id).exec()

    res.send('post deleted')
}

module.exports ={
    submitPost,
    getMyPost,
    updatePost,
    deletePost,
    getAllPosts
}
