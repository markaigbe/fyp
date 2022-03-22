const express = require('express')
const router = express.Router()
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// function to be called for every API endpoint that requires logged in status
const verifyJWT = (req,res,next) =>{
  const existingToken = req.headers['x-access-token']

  if(!existingToken){
    res.send('No token exists')
  }
  if(existingToken){
    jwt.verify(existingToken, process.env.JWT_SECRET,(err, username) => {
      if(err){
        res.json({auth: false, message: 'auth failed'})
      }
      else{
        req.body.username = username;
        next();
      }

    })
  }
  else{
    res.json({error, message:error})
  }
}

router.get('/userValid', verifyJWT, (req,res)=>{
  res.json({user: req.body.username})
})

router.delete('/logout', (req,res)=>{
  res.json({auth: false, message: 'user logged out'})
})

// submit users to db
router.post('/register', (req,res) =>{

  // checking if user already exists
  userModel.findOne({username: req.body.username}, async (err, user) =>{
    // handle any errors
    if (err) {
      console.log(err);
    }
    // if username already exists in db
    if(user){
      res.send('user already exists')
    }
    if(!user){
      try {
        // hashing password before submitted to db
        const hashedPass = await bcrypt.hash(req.body.password, 10)

        // new instance of user model to be mutated    
        const User = new userModel({
            // grabbing user register data and pushing to mongo
            username: req.body.username,
            password: hashedPass
        })
        const newUser = await User.save()
        console.log("Succesfully Registered: " + newUser) 
        res.json({user: req.body.username, message: 'Successfully Registered'})
      } 
      catch (error) {
        console.log(error)
      }
    }
  })
})

router.post('/login', async (req, res) => {
  const user = await userModel.findOne({ username: req.body.username });

  try{
      const match = await bcrypt.compare(req.body.password, user.password)

       const accessToken = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET)

      if(match){
          res.json({authenticated: true, username: req.body.username,accessToken: accessToken })
          // returns true if passwords match
          console.log(match);
      } else {    
          res.json({authenticated: false, message: "Invalid Credentials" })
      }
  } catch(error) {
      res.send({authenticated: false, message: 'No user exists'})
  }
})


module.exports = router;
