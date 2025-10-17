// Still need the express class
import express from 'express';
import applicationGateway from '../../gateways/application_gateway.js';
import isAuthorized from '../../middlewares/is_authorized.js';
import isAuthenticated from '../../middlewares/is_authenticated.js';
import isAdmin from '../../middlewares/helpers/is_admin.js';
import isApplicationOwner from '../../middlewares/helpers/is_app_owner.js';
import isApplicationRecruiter from '../../middlewares/helpers/is_app_recruiter.js';
import isCandidate from '../../middlewares/helpers/is_candidate.js';

// instanciate a router object for v1 routes
const applicationRouter = express.Router({mergeParams: true});

// use it
applicationRouter.get('/', isAuthenticated, isAuthorized(isAdmin), (req, res) => {
  const promise = applicationGateway.getAll();
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
  });
})

applicationRouter.get('/:uuid', isAuthenticated, isAuthorized(isApplicationOwner, isAdmin, isApplicationRecruiter), (req, res) => {
  const promise = applicationGateway.get(req.params.uuid);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
  });
})

applicationRouter.post('/', isAuthenticated,isAuthorized(isCandidate, isAdmin,),(req, res) => {
  const promise = applicationGateway.create(req.body);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    console.log(error);
    res.send(error);
  });
})

applicationRouter.put('/:uuid', isAuthenticated, isAuthorized(isApplicationOwner, isAdmin), (req, res) => {
  const promise = applicationGateway.update(req.params.uuid, req.body);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
  });
})

applicationRouter.delete('/:uuid', isAuthenticated, isAuthorized(isAdmin), (req, res) => {
  const promise = applicationGateway.delete(req.params.uuid);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
  });
})

export default applicationRouter;