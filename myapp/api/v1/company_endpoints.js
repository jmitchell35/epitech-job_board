// Still need the express class
import express from 'express';
import companyGateway from '../../gateways/company_gateway.js';
import isAuthenticated from '../../middlewares/is_authenticated.js';
import isAuthorized from '../../middlewares/is_authorized.js';
import isAdmin from '../../middlewares/helpers/is_admin.js';
import isRecruiter from '../../middlewares/helpers/is_recruiter.js';

// instanciate a router object for v1 routes
const companyRouter = express.Router({mergeParams: true});

// use it
companyRouter.get('/', (req, res) => {
  const promise = companyGateway.getAll();
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    console.log(error);
    res.send(error);
  });
})

companyRouter.get('/:uuid', (req, res) => {
  const promise = companyGateway.get(req.params.uuid);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    console.log(error);
    res.send(error);
  });
})

companyRouter.post('/', (req, res) => {
  const promise = companyGateway.create(req.body);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    console.log(error);
    res.send(error);
  });
})

// Permissions
companyRouter.put('/:uuid', isAuthenticated, isAuthorized(isAdmin), (req, res) => {
  const promise = companyGateway.update(req.params.uuid, req.body);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    console.log(error);
    res.send(error);
  });
})

companyRouter.delete('/:uuid', isAuthenticated, isAuthorized(isAdmin), (req, res) => {
  const promise = companyGateway.delete(req.params.uuid);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    console.log(error);
    res.send(error);
  });
})

export default companyRouter;