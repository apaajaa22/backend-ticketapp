const router = require('express').Router();
const tickets = require('./tickets');
const airlines = require('./airlines');
const users = require('./users');

router.use('/users', users);
router.use('/airlines', airlines);
router.use('/tickets', tickets);

module.exports = router;
