const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

// const tickets = require('./tickets');
const facilities = require('./facilities');

const ItemFacilities = sequelize.define('item_facilites', {
  id_ticket: Sequelize.INTEGER,
  id_facilities: Sequelize.INTEGER,
});
ItemFacilities.belongsTo(facilities, { foreignKey: 'id_facilities', sourceKey: 'id' });

// ItemFacilities.associate = function (models) {
//   ItemFacilities.hasMany(models.tickets, { as: 'facilitiesItem' });
// };
// ItemFacilities.belongsTo(tickets, { foreignKey: 'id_ticket', sourceKey: 'id' });

module.exports = ItemFacilities;
