const router = require('express').Router();
const tickets = require('./tickets');
const airlines = require('./airlines');
const users = require('./users');
const transactions = require('./transactions');
const chats = require('./chats');

router.use('/users', users);
router.use('/tickets', tickets);
router.use('/transactions', transactions);
router.use('/chats', chats);
router.use('/airlines', airlines);
router.use('/tickets', tickets);

module.exports = router;
