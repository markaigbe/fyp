const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// new user model for mongo
const UserSchema = new Schema({
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
})

module.exports = User = mongoose.model('user', UserSchema);