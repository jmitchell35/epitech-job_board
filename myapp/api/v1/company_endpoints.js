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

export default companyRouter;