const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Facilities = sequelize.define('facilities', {
  name: Sequelize.STRING,
});

module.exports = Facilities;
