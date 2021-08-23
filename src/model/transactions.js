const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');
const users = require('./users');

const Transactions = sequelize.define('transactions', {
  id_ticket: Sequelize.INTEGER,
  id_user: Sequelize.INTEGER,
  total_amount: Sequelize.INTEGER,
  isPayment: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

Transactions.belongsTo(users, { foreignKey: 'id_user', sourceKey: 'id' });
module.exports = Transactions;
