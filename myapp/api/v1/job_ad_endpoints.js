// Still need the express class
const express = require('express');

// instanciate a router object for v1 routes
const jobAdRouter = express.Router({mergeParams: true});

// use it
jobAdRouter.get('/', (req, res) => {
  res.send('Hello World!');
})

module.exports = jobAdRouter;