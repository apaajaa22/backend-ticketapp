const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../model/users');

const { APP_URL, APP_KEY, APP_UPLOAD_ROUTE } = process.env;

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

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: err.array()[0].msg,
    });
  }
  const user = await UserModel.findOne({
    where: { email },
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'user not found',
    });
  }
  const results = user;
  const compare = await bcrypt.compare(password, results.password);

  if (compare) {
    const token = jwt.sign({ id: results.id, email: results.email }, APP_KEY, { expiresIn: '1h' });
    return res.status(200).json({
      success: true,
      message: 'Login success',
      token,
    });
  }
  return res.status(400).json({
    success: false,
    message: 'username or password false',
  });
};
