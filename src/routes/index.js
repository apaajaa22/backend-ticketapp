const router = require('express').Router();
const airlines = require('./airlines');
const users = require('./users');

router.use('/users', users);
router.use('/airlines', airlines);

module.exports = router;
