const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Tickets = sequelize.define('tickets', {
  id_airlines: Sequelize.INTEGER,
  derpature: Sequelize.STRING,
  code_derpature: Sequelize.STRING,
  destination: Sequelize.STRING,
  code_destination: Sequelize.STRING,
  derpature_time: Sequelize.STRING,
  arrival_time: Sequelize.STRING,
  price: Sequelize.INTEGER,
  transit: Sequelize.STRING,
  id_item_facilities: Sequelize.INTEGER,
  class: Sequelize.STRING,
  terminal: Sequelize.STRING,
  seat: Sequelize.STRING,
  gate: Sequelize.STRING,
});

module.exports = Tickets;
