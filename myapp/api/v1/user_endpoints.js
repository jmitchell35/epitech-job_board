// Still need the express class
import express from 'express';
import userGateway from '../../gateways/company_gateway.js';


// instanciate a router object for v1 routes
const userRouter = express.Router({mergeParams: true});


// use it
userRouter.get('/', (req, res) => {
  const promise = userGateway.getAll();
    promise.then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.send(error);
    });
})

userRouter.get('/:uuid', (req, res) => {
  const promise = userGateway.get(req.params.uuid);
    promise.then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.send(error);
    });
})

userRouter.post('/', (req, res) => {
  const promise = userGateway.create(req.body);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
  });
})

userRouter.put('/:uuid', (req, res) => {
  const promise = userGateway.update(uuid, req.body);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
  });
})

userRouter.delete('/:uuid', (req, res) => {
  const promise = userGateway.delete(uuid);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
  });
})

export default userRouter;