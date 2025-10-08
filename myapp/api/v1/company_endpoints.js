// Still need the express class
const express = require('express');

// instanciate a router object for v1 routes
const companyRouter = express.Router({mergeParams: true});

// use it
companyRouter.get('/', (req, res) => {
  res.send('Hello World!');
})

module.exports = companyRouter;