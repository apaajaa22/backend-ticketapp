const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const facilities = require('./facilities');
// const tickets = require('./tickets');

const ItemFacilities = sequelize.define('item_facilites', {
  id_ticket: Sequelize.INTEGER,
  id_facilities: Sequelize.INTEGER,
});
ItemFacilities.belongsTo(facilities, { foreignKey: 'id_facilities', sourceKey: 'id' });
// facilities.hasOne(ItemFacilities);
// facilities.belongsTo(tickets, { foreignKey: 'id_ticket', sourceKey: 'id' });

module.exports = ItemFacilities;
