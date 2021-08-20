const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const airlines = sequelize.define('airlines', {
  name: Sequelize.STRING,
  picture: Sequelize.STRING,
});

module.exports = airlines;
