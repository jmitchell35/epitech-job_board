// Still need the express class
import express from 'express';
import candidateGateway from '../../gateways/candidate_gateway.js';
import isAuthenticated from '../../middlewares/is_authenticated.js';
import isAuthorized from '../../middlewares/is_authorized.js';
import isAdmin from '../../middlewares/helpers/is_admin.js';
import isCandidateOwner from '../../middlewares/helpers/is_candidate_owner.js';
import isCandidate from '../../middlewares/helpers/is_candidate.js';

// instanciate a router object for v1 routes
const candidateRouter = express.Router({mergeParams: true});

// use it
candidateRouter.get('/',  isAuthenticated, isAuthorized(isAdmin), (req, res) => {
  const promise = candidateGateway.getAll();
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
  });
})

candidateRouter.get('/:uuid', isAuthenticated, isAuthorized(isAdmin, isCandidateOwner), (req, res) => {
  const promise = candidateGateway.get(req.params.uuid);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
  });
})

candidateRouter.post('/', isAuthenticated, isAuthorized(isAdmin, isCandidate), (req, res) => {
  const promise = candidateGateway.create(req.body);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    console.log(error);
    res.send(error);
  });
})

candidateRouter.put('/:uuid', isAuthenticated, isAuthorized(isAdmin, isCandidateOwner), (req, res) => {
  const promise = candidateGateway.update(req.params.uuid, req.body);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
  });
})

candidateRouter.delete('/:uuid', isAuthenticated, isAuthorized(isAdmin), (req, res) => {
  const promise = candidateGateway.delete(req.params.uuid);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
  });
})

candidateRouter.get('/user/:uuid', isAuthenticated, isAuthorized(isAdmin, isCandidateOwner), (req, res) => {
  const promise = candidateGateway.findOneByAttribute('candidateId', req.params.uuid);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
  });
})

candidateRouter.put('/user/:uuid', isAuthenticated, isAuthorized(isAdmin, isCandidateOwner), (req, res) => {
  const promise = candidateGateway.findOneByAttribute('candidateId', req.params.uuid);
  promise.then((data) => {
    const updatePromise = candidateGateway.update(data.id, req.body);
    updatePromise.then((updatedCandidate) => {
    res.send(updatedCandidate);
    })
  })
  .catch((error) => {
    res.send(error);
  });
})

export default candidateRouter;