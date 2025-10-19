// Still need the express class
import express from 'express';
import userGateway from '../../gateways/user_gateway.js';
import genAuthToken from '../../helpers/genAuthToken.js';
import isAuthorized from '../../middlewares/is_authorized.js';
import isAuthenticated from '../../middlewares/is_authenticated.js';
import isAdmin from '../../middlewares/helpers/is_admin.js';
import isSelf from '../../middlewares/helpers/is_self.js';


// instanciate a router object for v1 routes
const userRouter = express.Router({ mergeParams: true });


// use it
userRouter.get('/', isAuthenticated, isAuthorized(isAdmin), (req, res) => {
  const promise = userGateway.getAll();
  promise.then((data) => {
    res.send(data);
  })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
})

userRouter.get('/:uuid', isAuthenticated, isAuthorized(isSelf, isAdmin), (req, res) => {
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
    const { id, email, profile } = data;
    const jwtToken = genAuthToken({ id, email, profile });

    res.cookie("authToken", jwtToken, {
      httpOnly: true,
      // secure: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.cookie('isLoggedIn', 'true', {
      httpOnly: false,
      // secure: true,
      sameSite: 'strict'
    });

    res.cookie('userId', data.id, {
      httpOnly: false,
      // secure: true,
      sameSite: 'strict'
    });

    console.log(profile);
    res.send(data);
  })
  .catch((error) => {
    console.log(error);
    res.send(error);
  });
})

userRouter.put('/:uuid', isAuthenticated, isAuthorized(isSelf, isAdmin), (req, res) => {
  const promise = userGateway.update(req.params.uuid, req.body);
  promise.then((data) => {
    res.send(data);
  })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
})

userRouter.delete('/:uuid', isAuthenticated, isAuthorized(isAdmin), (req, res) => {
  const promise = userGateway.delete(req.params.uuid);
  promise.then((data) => {
    res.send(data);
  })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
})

userRouter.get('/profile/:profile', isAuthenticated, isAuthorized(isAdmin), (req, res) => {
  const promise = userGateway.findManyByAttribute('profile', req.params.profile);
  promise.then((data) => {
    res.send(data);
  })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
})

export default userRouter;