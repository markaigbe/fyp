const mongoose = require('mongoose');

// Connect to mongoDB atlas
const db = require('../bin/mongoURI').mongoURI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('CONNECTED TO MONGODB'))
  .catch(err => console.log(err));
