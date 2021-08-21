const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Chats = sequelize.define('chats', {
  message: Sequelize.STRING,
  sender: Sequelize.INTEGER,
  recipient: Sequelize.INTEGER,
  isLatest: Sequelize.BOOLEAN,
  attachment: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Chats;
