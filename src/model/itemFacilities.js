const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const facilities = require('./facilities');

const ItemFacilities = sequelize.define('item_facilities', {
  ticketId: Sequelize.INTEGER,
  facilityId: Sequelize.INTEGER,
});

ItemFacilities.belongsTo(facilities);

module.exports = ItemFacilities;
