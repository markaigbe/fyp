const mongoose = require('mongoose')
const Schema = mongoose.Schema

// post model for mongo
const PostSchema = new Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
    default: " "
  },
  date : {
    type: Date,
    default: Date.now()
  },

}, {collection: 'posts'})

const Post = mongoose.model('post', PostSchema);
module.exports = {Post}