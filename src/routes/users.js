/* eslint-disable no-useless-return */
/* eslint-disable no-undef */
const users = require('express').Router();
const { checkSchema } = require('express-validator');
const upload = require('../middlewares/upload');
const {
  register, login, updateUser, searchUser, getSignedUser,
  deleteUser, confirmPassword, changePassword, updatePicture,
} = require('../controllers/users');
const schemaRegister = require('../helpers/validationSchema/register');
const schemaLogin = require('../helpers/validationSchema/login');
const auth = require('../middlewares/auth');

users.get('/', auth, searchUser);
users.get('/signed', auth, getSignedUser);
users.put('/update-profile', auth, upload, updateUser);
users.put('/update-picture', auth, updatePicture);
users.post('/register', checkSchema(schemaRegister), register);
users.post('/login', checkSchema(schemaLogin), login);
users.post('/confirm-password', auth, confirmPassword);
users.put('/change-password', auth, changePassword);
users.delete('/delete/:id', auth, deleteUser);

module.exports = users;
