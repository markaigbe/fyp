const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// new comment model for mongo
const CommentSchema = new Schema({
  text: {
    type: String,
    default: "",
    required: true,
  },
  date : {
    type: Date,
    default: Date.now()
  }
}, {collection: 'comments'})

module.exports = Comment = mongoose.model('comment', CommentSchema);