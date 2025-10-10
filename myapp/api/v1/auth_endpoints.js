// Still need the express class
import express from 'express';

// instanciate a router object for v1 routes
const authRouter = express.Router({mergeParams: true});

// use it
authRouter.get('/', (req, res) => {
  res.send('Hello World!');
})

export default authRouter;