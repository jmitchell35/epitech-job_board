// Still need the express class
import express from 'express';
import recruiterGateway from '../../gateways/recruiter_gateway.js';
import isAuthorized from '../../middlewares/is_authorized.js';
import isAuthenticated from '../../middlewares/is_authenticated.js';
import isRecruiterOwner from '../../middlewares/helpers/is_recruiter_owner.js';
import isAdmin from '../../middlewares/helpers/is_admin.js';
import isRecruiter from '../../middlewares/helpers/is_recruiter.js';

// instanciate a router object for v1 routes
const recruiterRouter = express.Router({mergeParams: true});

// use it
recruiterRouter.get('/', isAuthenticated, isAuthorized(isAdmin), (req, res) => {
  const promise = recruiterGateway.getAll();
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
    console.log(error);
  });
});

recruiterRouter.get('/:uuid', isAuthenticated, isAuthorized(isAdmin, isRecruiterOwner), (req, res) => {
  const promise = recruiterGateway.get(req.params.uuid);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
    console.log(error);
  });
});

recruiterRouter.post('/', isAuthenticated, isAuthorized(isRecruiter, isAdmin), (req, res) => {
  const promise = recruiterGateway.create(req.body);
  promise.then((data) => {
    const { companyId } = data;

        res.cookie('companyId', companyId, {
          httpOnly: false,
          // secure: true,
          sameSite: 'strict'
        });

    res.send(data);
  })
  .catch((error) => {
    res.send(error);
    console.log(error);
  });
});

recruiterRouter.put('/:uuid', isAuthenticated, isAuthorized(isRecruiterOwner, isAdmin),(req, res) => {
  const promise = recruiterGateway.update(req.params.uuid, req.body);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
    console.log(error);
  });
});

recruiterRouter.delete('/:uuid', isAuthenticated, isAuthorized(isAdmin), (req, res) => {
  const promise = recruiterGateway.delete(req.params.uuid);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
    console.log(error);
  });
});

recruiterRouter.get('/user/:uuid', isAuthenticated, isAuthorized(isAdmin, isRecruiterOwner), (req, res) => {
  const promise = recruiterGateway.findOneByAttribute('recruiterId', req.params.uuid);
  promise.then((data) => {
    res.send(data);
  })
  .catch((error) => {
    res.send(error);
  });
})

recruiterRouter.put('/user/:uuid', isAuthenticated, isAuthorized(isAdmin, isRecruiterOwner), (req, res) => {
  const promise = recruiterGateway.findOneByAttribute('recruiterId', req.params.uuid);
  promise.then((data) => {
    const updatePromise = recruiterGateway.update(data.id, req.body);
    updatePromise.then((updatedRecruiter) => {
    res.send(updatedRecruiter);
    })
  })
  .catch((error) => {
    res.send(error);
  });
})




export default recruiterRouter;
