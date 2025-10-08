// Still need the express class
const express = require('express');

// instanciate a router object for v1 routes
const authRouter = express.Router({mergeParams: true});

// use it
authRouter.get('/', (req, res) => {
  res.send('Hello World!');
})

module.exports = authRouter;