const router = require('express').Router();
const tickets = require('./tickets');
const airlines = require('./airlines');
const users = require('./users');
const transactions = require('./transactions');
const chats = require('./chats');
const facilities = require('./facilities');
const itemFacilities = require('./itemFacilities');

router.use('/users', users);
router.use('/tickets', tickets);
router.use('/transactions', transactions);
router.use('/chats', chats);
router.use('/airlines', airlines);
router.use('/tickets', tickets);
router.use('/facilities', facilities);
router.use('/item-facilities', itemFacilities);

module.exports = router;
