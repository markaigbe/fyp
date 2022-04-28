const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// new user schema for mongo
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date : {
    type: Date,
    default: Date.now()
  },
  role:{
    type: String,
    default: 'user'
  },
  posts:[{
    type: Schema.Types.ObjectId,
    ref: 'post'
  }]

}, {collection: 'users'})

// creating a model called user passing the userSchemas params
const User = mongoose.model('user', UserSchema);
module.exports = {User}