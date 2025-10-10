// Still need the express class
import express from 'express';

// instanciate a router object for v1 routes
const jobAdRouter = express.Router({mergeParams: true});

// use it
jobAdRouter.get('/', (req, res) => {
  res.send('Hello World!');
})

export default jobAdRouter;