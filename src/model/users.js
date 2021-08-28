const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const User = sequelize.define('users', {
  fullname: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        args: true,
        msg: 'fullname must be filled at least 1 character',
      },
      max: {
        args: [12],
        msg: 'fullname length max is 12 characters',
      },
    },
  },
  picture: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    isEmail: true,
  },
  password: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        args: true,
        msg: 'password must be filled at least 1 character',
      },
      min: {
        args: [8],
        msg: 'password length min 8 characters at least',
      },
    },
  },
  phone_number: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        args: true,
        msg: 'phone number must be filled at least 10 character',
      },
    },
  },
  city: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        args: true,
        msg: 'city must be filled at least 4 character',
      },
    },
  },
  address: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        args: true,
        msg: 'address must be filled at least 4 character',
      },
    },
  },
  postcode: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        args: true,
        msg: 'postcode must be filled at least 5 character',
      },
    },
  },
});

module.exports = User;
