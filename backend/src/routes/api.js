const express = require('express');
const router = express.Router();
const { findRoute } = require('../controllers/routeController');
const { validateRouteRequest } = require('../middleware/validator');

router.post('/route', validateRouteRequest, findRoute);

module.exports = router;
