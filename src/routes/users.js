/* eslint-disable no-undef */
const users = require('express').Router();
const { checkSchema } = require('express-validator');
const upload = require('../helpers/upload');
const { register, login, updateUser } = require('../controllers/users');
const schemaRegister = require('../helpers/validationSchema/register');
const schemaLogin = require('../helpers/validationSchema/login');
const auth = require('../middlewares/auth');

users.put('/update-profile', auth, upload, updateUser);
users.post('/register', checkSchema(schemaRegister), register);
users.post('/login', checkSchema(schemaLogin), login);

module.exports = users;
