// Still need the express class
const express = require('express');

// instanciate a router object for v1 routes
const candidateRouter = express.Router({mergeParams: true});

// use it
candidateRouter.get('/', (req, res) => {
  res.send('Hello World!');
})

module.exports = candidateRouter;