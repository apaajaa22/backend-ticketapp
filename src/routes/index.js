const router = require('express').Router();
const users = require('./users');
const tickets = require('./tickets');
const transactions = require('./transactions');

router.use('/users', users);
router.use('/tickets', tickets);
router.use('/transactions', transactions);

module.exports = router;
