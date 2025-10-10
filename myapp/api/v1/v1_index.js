// Still need the express class
import express from 'express';

// instanciate a router object for v1 routes
const v1Router = express.Router();

// import entity routers
import authRouter from './auth_endpoints.js';
import userRouter from './user_endpoints.js';
import candidateRouter from './candidate_endpoints.js';
import recruiterRouter from './recruiter_endpoints.js';
import jobAdRouter from './job_ad_endpoints.js';
import jobAppRouter from './job_application_endpoints.js';
import companyRouter from './company_endpoints.js';

// use it
v1Router.use('/auth', authRouter);
v1Router.use('/users', userRouter);
v1Router.use('/candidate', candidateRouter);
v1Router.use('/recruiter', recruiterRouter);
v1Router.use('/job_advertisement', jobAdRouter);
v1Router.use('/job_application', jobAppRouter);
v1Router.use('/companies', companyRouter);

export default v1Router;