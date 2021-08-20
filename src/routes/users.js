/* eslint-disable no-undef */
const users = require('express').Router();
const { checkSchema } = require('express-validator');
const { register, login } = require('../controllers/users');
const schemaRegister = require('../helpers/validationSchema/register');
const schemaLogin = require('../helpers/validationSchema/login');

users.post('/register', checkSchema(schemaRegister), register);
users.post('/login', checkSchema(schemaLogin), login);

module.exports = users;
