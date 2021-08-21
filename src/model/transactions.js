const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Transactions = sequelize.define('transactions', {
  id_ticket: Sequelize.INTEGER,
  id_user: Sequelize.INTEGER,
  total_amount: Sequelize.INTEGER,
  isPayment: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

module.exports = Transactions;
