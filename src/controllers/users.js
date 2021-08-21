/* eslint-disable no-console */
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const bcrypt = require('bcrypt');
const { response } = require('../helpers/response');
const UserModel = require('../model/users');

// const { APP_URL, APP_KEY, APP_UPLOAD_ROUTE } = process.env;
const path = './assets/images';
const { APP_KEY, APP_UPLOAD_ROUTE } = process.env;

// const { APP_URL } = process.env;

exports.updateUser = async (req, res) => {
  const setData = req.body;
  try {
    const getUser = await UserModel.findByPk(req.authUser.id);
    if (req.file) {
      setData.picture = `${APP_UPLOAD_ROUTE}/${req.file.filename}`;
    } else {
      setData.picture = getUser.dataValues.picture;
    }
    if (req.file !== undefined && getUser.dataValues.picture !== null) {
      const slicePicture = getUser.dataValues.picture.slice('8');
      fs.unlinkSync(`${path}${slicePicture}`, (err, newData) => {
        if (!err) return response(res, true, newData, 200);
        return newData;
      });
    }
    const result = await UserModel.update(setData, {
      where: {
        id: getUser.dataValues.id,
      },
    });
    result.data = setData;
    return response(res, true, result.data, 200);
  } catch (err) {
    console.log(err);
    return response(res, false, 'An error occured', 500);
  }
};

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
    const token = jwt.sign({ id: results.id, email: results.email }, APP_KEY, { expiresIn: '24h' });
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
