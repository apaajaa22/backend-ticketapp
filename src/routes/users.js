/* eslint-disable no-undef */
const router = require('express').Router();
const user = require('../controllers/users');
const upload = require('../helpers/upload');

router.put('/update-profile', upload, user.updateUser);

module.exports = router;
