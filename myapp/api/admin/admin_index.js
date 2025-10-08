// Still need the express class
const express = require('express');

// instanciate a router object for v1 routes
const adminRouter = express.Router({mergeParams: true});

// import entity routers
// const userAdminRouter = require('./user_endpoints.js');
// const candidateAdminRouter = require('./candidate_profile_endpoints.js');
// const recruiterAdminRouter = require('./recruiter_profile_endpoints.js');
// const jobAdAdminRouter = require('./job_ad_endpoints.js');
// const jobAppAdminRouter = require('./job_application_endpoints.js');
// const companyAdminRouter = require('./company_endpoints.js');

// use it
// adminRouter.use('/users', userAdminRouter);
// adminRouter.use('/candidate', candidateAdminRouter);
// adminRouter.use('/recruiter', recruiterAdminRouter);
// adminRouter.use('/job_advertisement', jobAdAdminRouterRouter);
// adminRouter.use('/job_application', jobAppAdminRouterRouter);
// adminRouter.use('/company', companyAdminRouter);

module.exports = adminRouter;