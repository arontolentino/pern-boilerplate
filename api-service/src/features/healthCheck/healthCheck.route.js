const express = require('express');
const healthCheckController = require('./healthCheck.controller');

const router = express.Router();

router.get('/', healthCheckController.checkServerHealth);

module.exports = router;
