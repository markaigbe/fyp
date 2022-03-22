const express = require('express');
const router = express.Router();

/* GET home page for application */
router.get('/', (req, res, next) => {
  console.log('Connected to index page');
  res.json({'message': 'Hello from index route (express)'});
});

module.exports = router;
