const { validationResult } = require('express-validator');
// const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../model/users');
// const responseStandard = require('../helpers/response');

exports.register = async (req, res) => {
  const err = validationResult(req);
  const checkEmail = await UserModel.findOne({
    where: { email: req.body.email },
  });
  if (checkEmail) {
    return res.status(401).json({
      success: false,
      message: 'email is already in use',
    });
  }
  if (!err.isEmpty()) {
    return res.status(401).json({
      success: false,
      message: err.array()[0].msg,
    });
  }
  req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt());
  const user = await UserModel.create(req.body);
  return res.status(200).json({
    success: true,
    message: 'User Created Successfully',
    results: user,
  });
};
