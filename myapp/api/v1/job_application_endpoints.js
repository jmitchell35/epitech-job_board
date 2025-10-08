// Still need the express class
const express = require('express');

// instanciate a router object for v1 routes
const jobApplicationRouter = express.Router({mergeParams: true});

// use it
jobApplicationRouter.get('/', (req, res) => {
  res.send('Hello World!');
})

module.exports = jobApplicationRouter;