// Still need the express class
const express = require('express');

// instanciate a router object for v1 routes
const v1Router = express.Router();

// import entity routers
const authRouter = require('./auth_endpoints.js');
const userRouter = require('./user_endpoints.js');
const candidateRouter = require('./candidate_endpoints.js');
const recruiterRouter = require('./recruiter_endpoints.js');
const jobAdRouter = require('./job_ad_endpoints.js');
const jobAppRouter = require('./job_application_endpoints.js');
const companyRouter = require('./company_endpoints.js');

// use it
v1Router.use('/auth', authRouter);
v1Router.use('/users', userRouter);
v1Router.use('/candidate', candidateRouter);
v1Router.use('/recruiter', recruiterRouter);
v1Router.use('/job_advertisement', jobAdRouter);
v1Router.use('/job_application', jobAppRouter);
v1Router.use('/company', companyRouter);

module.exports = v1Router;