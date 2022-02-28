const router = require('express').Router();

const jugadoresRoute = require('./jugadores');
const equiposRoute = require('./equipos');

router.use('/api/v1/jugadores', jugadoresRoute);
router.use('/api/v1/equipos', equiposRoute);

module.exports = router;