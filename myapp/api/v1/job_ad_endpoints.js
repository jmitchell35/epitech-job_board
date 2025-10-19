// Still need the express class
import express from 'express';
import jobAdGateway from '../../gateways/advertisement_gateway.js';
import isAuthorized from '../../middlewares/is_authorized.js';
import isAuthenticated from '../../middlewares/is_authenticated.js';
import isAdmin from '../../middlewares/helpers/is_admin.js';
import isRecruiter from '../../middlewares/helpers/is_recruiter.js';
import isAdvertisementOwner from '../../middlewares/helpers/is_ad_owner.js';
import isSelf from '../../middlewares/helpers/is_self.js';

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
    console.log(error);
  });
});

jobAdRouter.get('/:uuid', (req, res) => {
  const promise = jobAdGateway.get(req.params.uuid);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
    console.log(error);
  });
});

jobAdRouter.post('/', isAuthenticated, isAuthorized(isRecruiter, isAdmin), (req, res) => {
  const promise = jobAdGateway.create(req.body);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
    console.log(error);
  });
});

jobAdRouter.put('/:uuid', isAuthenticated, isAuthorized(isAdvertisementOwner, isAdmin), (req, res) => {
  const promise = jobAdGateway.update(req.params.uuid, req.body);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
    console.log(error);
  });
});

jobAdRouter.delete('/:uuid', isAuthenticated, isAuthorized(isAdmin), (req, res) => {
  const promise = jobAdGateway.delete(req.params.uuid);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
    console.log(error);
  });
});

jobAdRouter.get('/company/:uuid', (req, res) => {
  const promise = jobAdGateway.findManyByAttribute('companyId', req.params.uuid);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
    console.log(error);
  });
});

jobAdRouter.get('/recruiter/:uuid', isAuthenticated, isAuthorized(isAdmin, isSelf), (req, res) => {
  const promise = jobAdGateway.findManyByAttribute('recruiterId', req.params.uuid);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
    console.log(error);
  });
});

export default jobAdRouter;
