/* eslint-disable radix */
/* eslint-disable no-console */
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { Op, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
const { response } = require('../helpers/response');
const UserModel = require('../model/users');

const path = './assets/images';
const { APP_KEY, APP_UPLOAD_ROUTE, APP_URL } = process.env;

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

exports.searchUser = async (req, res) => {
  const cond = req.query;
  cond.search = cond.search || '';
  cond.sort = cond.sort || {};
  cond.sort.fullname = cond.sort.fullname || 'asc';
  cond.limit = parseInt(cond.limit) || 5;
  cond.offset = parseInt(cond.offset) || 0;
  cond.page = parseInt(cond.page) || 1;
  cond.offset = (cond.page * cond.limit) - cond.limit;
  const pageInfo = {};

  try {
    const result = await UserModel.findAndCountAll({
      where: {
        [Op.or]: {
          fullname: {
            [Op.like]: `%${cond.search}%`,
          },
          email: {
            [Op.like]: `%${cond.search}%`,
          },
        },
      },
      limit: cond.limit,
      order: Sequelize.literal(`fullname ${cond.sort.fullname}`),
      offset: cond.offset,
    }, cond);
    const totalData = result;
    const totalPage = Math.ceil(totalData.count / cond.limit);
    pageInfo.totalData = totalData;
    pageInfo.currentPage = cond.page;
    pageInfo.totalPage = totalPage;
    pageInfo.limitData = cond.limit;
    pageInfo.nextPage = cond.page < totalPage ? `${APP_URL}/users?page=${cond.page + 1}` : null;
    pageInfo.prevPage = cond.page <= totalPage || cond.page === 1 ? `${APP_URL}/users?page=${cond.page - 1}` : null;
    if (pageInfo.prevPage === `${APP_URL}/users?page=0`) pageInfo.prevPage = null;
    if (result.count === 0) return response(res, false, 'User not found', 400);
    return response(res, true, result.data, 200, pageInfo);
  } catch (err) {
    console.log(err);
    return response(res, false, 'An error occured', 500);
  }
};

exports.getSignedUser = async (req, res) => {
  try {
    const result = await UserModel.findByPk(req.authUser.id);
    return response(res, true, result, 200);
  } catch (err) {
    console.log(err);
    return response(res, false, 'An error occured', 500);
  }
};
