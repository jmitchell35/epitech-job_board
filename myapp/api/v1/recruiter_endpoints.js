// Still need the express class
const express = require('express');

// instanciate a router object for v1 routes
const recruiterRouter = express.Router({mergeParams: true});

// use it
recruiterRouter.get('/', (req, res) => {
  res.send('Hello World!');
})

module.exports = recruiterRouter;