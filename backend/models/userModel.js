const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// new user schema for mongo
const UserSchema = new Schema({
  // _id: user,
  username: {
    type: String,
    default: "",
    required: true,
    unique: true
  },
  password: {
    type: String,
    default: "",
    required: true
  },
  date : {
    type: Date,
    default: Date.now()
  }

}, {collection: 'users'})



module.exports = User = mongoose.model('user', UserSchema);