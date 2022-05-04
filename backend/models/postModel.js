const mongoose = require('mongoose')
const Schema = mongoose.Schema

// post model for mongo
const PostSchema = new Schema({
  // user:
  // {type: Schema.Types.ObjectId,
  // ref: 'user'
  // },
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