const {User} = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

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

// test 'verifyJWT' route by sending username if auth is true
const userValid = (req,res)=>{
    res.json({user: req.body.username})
}

// delete user from db
const deleteUser = async (req,res) =>{

    const user = await User.findById(req.params.id)
    if(!user){
        res.send('id not found') 
        console.log(user)
    }

    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id)

        res.json({message: `deleted user  ${deletedUser}`})
    } catch (error) {
        console.log(error)
    }

}

// generate jwt token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '5h'})
}

// registers user
const registerUser = async (req,res) =>{
  // checking if user already exists
  User.findOne({username: req.body.username}, async (err, user) =>{
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
        const user = new User({
            // grabbing user register data and pushing to mongo
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        })
        const newUser = await user.save()
        console.log("Succesfully Registered: " + newUser) 
        res.json({user: req.body.username, token: generateToken(user.username),  message: 'Successfully Registered'})
      } 
      catch (error) {
        console.log(error)
      }
    }
  })
}

// logs in user
const loginUser = async (req, res) => {
  const user = await User.findOne({ username: req.body.username })

  try{
    const match = await bcrypt.compare(req.body.password, user.password)

    const accessToken = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET)

    if(match){
        res.json({authenticated: true, username: req.body.username, accessToken: accessToken})
        // returns true if passwords match
        console.log(match);
    } else {    
        res.json({authenticated: false, message: "Invalid Credentials" })
    }
} catch(error) {
    res.send({authenticated: false, message: 'No user exists'})
}
}

// calls all users
const getUsers = (req,res) =>{
    User.find( (err, result) =>{
        if(err) {res.send(err)}
        res.send(result)
    })
}

// calls one user
const getOneUserID = async(req,res) =>{

    const {_id, username,email} = await User.findById(req.params.id)

    res.json({id: _id, username, email})
}

// export components
module.exports = {
    deleteUser,
    getUsers,
    getOneUserID,
    generateToken,
    userValid,
    verifyJWT,
    loginUser,
    registerUser
}