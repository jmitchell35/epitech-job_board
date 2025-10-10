// Still need the express class to instanciate a Router object
import express from 'express';

// Instanciate a router object
const apiVersionsRouter = express.Router();

// Import v1 routes to the api_versions_router
import v1Router from './v1/v1_index.js';
import adminRouter from './admin/admin_index.js';

// User v1 routes in api_versions_router
apiVersionsRouter.use('/api/v1', v1Router);
apiVersionsRouter.use('/api/admin', adminRouter);

export default apiVersionsRouter;