const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');
const UserModel = require('./users');

const notifications = sequelize.define('notifications', {
  userId: Sequelize.INTEGER,
  label: Sequelize.STRING,
  message: Sequelize.STRING,
});

notifications.belongsTo(UserModel, { foreignKey: 'userId', sourceKey: 'id', as: 'userDetail' });

module.exports = notifications;
