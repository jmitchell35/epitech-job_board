// Still need the express class
import express from 'express';
import companyGateway from '../../gateways/company_gateway.js';

// instanciate a router object for v1 routes
const companyRouter = express.Router({mergeParams: true});

// use it
companyRouter.get('/', (req, res) => {
  const promise = companyGateway.getAll();
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
  });
})

companyRouter.get('/:uuid', (req, res) => {
  const promise = companyGateway.get(req.params.uuid);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
  });
})

companyRouter.post('/', (req, res) => {
  const promise = companyGateway.create(req.body);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
  });
})

companyRouter.put('/:uuid', (req, res) => {
  const promise = companyGateway.update(uuid, req.body);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
  });
})

companyRouter.delete('/:uuid', (req, res) => {
  const promise = companyGateway.delete(uuid);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
  });
})

export default companyRouter;