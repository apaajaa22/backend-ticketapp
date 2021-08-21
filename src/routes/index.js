const router = require('express').Router();
const users = require('./users');
const tickets = require('./tickets');
const transactions = require('./transactions');
const chats = require('./chats');

router.use('/users', users);
router.use('/tickets', tickets);
router.use('/transactions', transactions);
router.use('/chats', chats);

module.exports = router;
