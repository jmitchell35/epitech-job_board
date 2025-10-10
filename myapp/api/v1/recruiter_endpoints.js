// Still need the express class
import express from 'express';
import recruiterGateway from '../../gateways/recruiter_gateway.js';

// instanciate a router object for v1 routes
const recruiterRouter = express.Router({mergeParams: true});

// use it
recruiterRouter.get('/', (req, res) => {
  const promise = recruiterGateway.getAll();
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
  });
});

recruiterRouter.get('/:uuid', (req, res) => {
  const promise = recruiterGateway.get(req.params.uuid);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
  });
});

recruiterRouter.post('/', (req, res) => {
  const promise = recruiterGateway.create(req.body);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
  });
});

recruiterRouter.put('/:uuid', (req, res) => {
  const promise = recruiterGateway.update(req.params.uuid, req.body);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
  });
});

recruiterRouter.delete('/:uuid', (req, res) => {
  const promise = recruiterGateway.delete(req.params.uuid);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
  });
});

export default recruiterRouter;
