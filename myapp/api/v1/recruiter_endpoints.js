// Still need the express class
import express from 'express';

// instanciate a router object for v1 routes
const recruiterRouter = express.Router({mergeParams: true});

// use it
recruiterRouter.get('/', (req, res) => {
  res.send('Hello World!');
})

export default recruiterRouter;