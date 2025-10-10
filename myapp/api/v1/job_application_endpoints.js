// Still need the express class
import express from 'express';
import applicationGateway from '../../gateways/application_gateway.js';

// instanciate a router object for v1 routes
const applicationRouter = express.Router({mergeParams: true});

// use it
applicationRouter.get('/', (req, res) => {
  const promise = applicationGateway.getAll();
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
  });
})

applicationRouter.get('/:uuid', (req, res) => {
  const promise = applicationGateway.get(req.params.uuid);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
  });
})

applicationRouter.post('/', (req, res) => {
  const promise = applicationGateway.post(req.body);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
  });
})

applicationRouter.put('/:uuid', (req, res) => {
  const promise = applicationGateway.put(req.body);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
  });
})

applicationRouter.delete('/:uuid', (req, res) => {
  const promise = applicationGateway.delete(req.body);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
  });
})

export default applicationRouter;