// Still need the express class
import express from 'express';
import candidateGateway from '../../gateways/candidate_gateway.js';

// instanciate a router object for v1 routes
const candidateRouter = express.Router({mergeParams: true});

// use it
candidateRouter.get('/', (req, res) => {
  const promise = candidateGateway.getAll();
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
  });
})

candidateRouter.get('/:uuid', (req, res) => {
  const promise = candidateGateway.get(req.params.uuid);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
  });
})

candidateRouter.post('/', (req, res) => {
  const promise = candidateGateway.post(req.body);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
  });
})

candidateRouter.put('/:uuid', (req, res) => {
  const promise = candidateGateway.put(req.body);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
  });
})

candidateRouter.delete('/:uuid', (req, res) => {
  const promise = candidateGateway.delete(req.body);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
  });
})

export default candidateRouter;