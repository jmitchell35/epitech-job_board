// Still need the express class
import express from 'express';
import jobAdGateway from '../../gateways/advertisement_gateway.js';

// instanciate a router object for v1 routes
const jobAdRouter = express.Router({mergeParams: true});

// use it
jobAdRouter.get('/', (req, res) => {
  const promise = jobAdGateway.getAll();
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
  });
});

jobAdRouter.get('/:uuid', (req, res) => {
  const promise = jobAdGateway.get(req.params.uuid);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
  });
});

jobAdRouter.post('/', (req, res) => {
  const promise = jobAdGateway.create(req.body);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
  });
});

jobAdRouter.put('/:uuid', (req, res) => {
  const promise = jobAdGateway.update(req.params.uuid, req.body);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
  });
});

jobAdRouter.delete('/:uuid', (req, res) => {
  const promise = jobAdGateway.delete(req.params.uuid);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
  });
});

export default jobAdRouter;
