/* eslint-disable no-undef */
const users = require('express').Router();
const { checkSchema } = require('express-validator');
const { register } = require('../controllers/users');
const schemaRegister = require('../helpers/validationSchema/register');

users.post('/register', checkSchema(schemaRegister), register);

module.exports = users;
