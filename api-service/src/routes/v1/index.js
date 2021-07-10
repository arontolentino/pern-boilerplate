const express = require('express');
const { authRoute } = require('../../features/auth');
const { userRoute } = require('../../features/user');
const { healthCheckRoute } = require('../../features/healthCheck');

const router = express.Router();

const routes = [
  {
    path: '/auth',
    route: authRoute,
  },
  { path: '/users', route: userRoute },
  {
    path: '/health-check',
    route: healthCheckRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
