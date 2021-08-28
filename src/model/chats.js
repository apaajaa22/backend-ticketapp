const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./users');

const Chats = sequelize.define('chats', {
  message: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Message must be filled at least 1 character',
      },
    },
  },
  sender: Sequelize.INTEGER,
  recipient: Sequelize.INTEGER,
  isLatest: Sequelize.BOOLEAN,
  attachment: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});
Chats.belongsTo(User, { foreignKey: 'recipient', sourceKey: 'id' });

module.exports = Chats;
