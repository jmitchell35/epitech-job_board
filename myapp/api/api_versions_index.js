// Still need the express class to instanciate a Router object
const express = require('express');

// Instanciate a router object
const apiVersionsRouter = express.Router();

// Import v1 routes to the api_versions_router
const v1Router = require('./v1/v1_index.js');
const adminRouter = require('./admin/admin_index.js');

// User v1 routes in api_versions_router
apiVersionsRouter.use('/api/v1', v1Router);
apiVersionsRouter.use('/api/admin', adminRouter);

module.exports = apiVersionsRouter;