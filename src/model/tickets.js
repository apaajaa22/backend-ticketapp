const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');
const airlinesModel = require('./airlines');
const Transactions = require('./transactions');
// const Facilities = require('./facilities');
const ItemFacilities = require('./itemFacilities');

const tickets = sequelize.define('tickets', {
  id_airlines: Sequelize.INTEGER,
  departure: Sequelize.STRING,
  code_departure: Sequelize.STRING,
  destination: Sequelize.STRING,
  code_destination: Sequelize.STRING,
  departure_time: Sequelize.STRING,
  arrival_time: Sequelize.STRING,
  price: Sequelize.INTEGER,
  transit: Sequelize.STRING,
  class: Sequelize.STRING,
  terminal: Sequelize.STRING,
  seat: Sequelize.STRING,
  gate: Sequelize.STRING,
});
tickets.hasMany(ItemFacilities);
tickets.belongsTo(airlinesModel, { foreignKey: 'id_airlines', sourceKey: 'id' });

Transactions.belongsTo(tickets, { foreignKey: 'id_ticket', sourceKey: 'id' });

module.exports = tickets;
