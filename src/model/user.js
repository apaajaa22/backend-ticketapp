const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const User = sequelize.define('users', {
  fullname: Sequelize.STRING,
  picture: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  phone_number: Sequelize.STRING,
  city: Sequelize.STRING,
  address: Sequelize.STRING,
  postcode: Sequelize.STRING,
});

module.exports = User;
