// Still need the express class
import express from 'express';
import userGateway from '../../gateways/user_gateway.js';
import genAuthToken from '../../helpers/genAuthToken.js';


// instanciate a router object for v1 routes
const userRouter = express.Router({ mergeParams: true });


// use it
userRouter.get('/', (req, res) => {
  const promise = userGateway.getAll();
  promise.then((data) => {
    res.send(data);
  })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
})

userRouter.get('/:uuid', (req, res) => {
  const promise = userGateway.get(req.params.uuid);
  promise.then((data) => {
    res.send(data);
  })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
})

userRouter.post('/', (req, res) => {
  console.log(req.body);
  const promise = userGateway.create(req.body);
  promise.then((data) => {
    const { email, profile } = data;
    const jwtToken = genAuthToken({ email, profile });

    res.cookie("authToken", jwtToken, {
      httpOnly: true,
      // secure: true,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.cookie('isLoggedIn', 'true', {
      httpOnly: false,
      // secure: true,
      sameSite: 'strict'
    });

    res.send(data);
  })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
})

userRouter.put('/:uuid', (req, res) => {
  const promise = userGateway.update(req.params.uuid, req.body);
  promise.then((data) => {
    res.send(data);
  })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
})

userRouter.delete('/:uuid', (req, res) => {
  const promise = userGateway.delete(req.params.uuid);
  promise.then((data) => {
    res.send(data);
  })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
})

export default userRouter;