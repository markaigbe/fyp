const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// post model for mongo
const PostSchema = new Schema({
  title: {
    type: String,
    default: "",
    required: true,
  },
  content: {
    type: String,
    default: "",
    required: true
  },
  date : {
    type: Date,
    default: Date.now()
  }
}, {collection: 'posts'})

module.exports = Post = mongoose.model('post', PostSchema);