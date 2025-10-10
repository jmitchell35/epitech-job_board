// Still need the express class
import express from 'express';

// instanciate a router object for v1 routes
const jobApplicationRouter = express.Router({mergeParams: true});

// use it
jobApplicationRouter.get('/', (req, res) => {
  res.send('Hello World!');
})

export default jobApplicationRouter;