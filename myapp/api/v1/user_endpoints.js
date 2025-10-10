// Still need the express class
import express from 'express';

// instanciate a router object for v1 routes
const userRouter = express.Router();

// use it
userRouter.get('/', (req, res) => {
  res.send('Hello World!');
})

userRouter.get('/:uuid', (req, res) => {
  res.send(`Hello ${req.params.uuid}!`);
})

export default userRouter;