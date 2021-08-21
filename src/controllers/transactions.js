/* eslint-disable no-unused-vars */
/* eslint-disable radix */
/* eslint-disable prefer-const */
/* eslint-disable no-console */
const { Op } = require('sequelize');
const { response } = require('../helpers/response');
const Transactions = require('../model/transactions');
const Tickets = require('../model/tickets');
// const Users = require('../model/users');
const airlinesModel = require('../model/airlines');

exports.createTransaction = async (req, res) => {
  const { id } = req.authUser;
  const setData = req.body;
  setData.isPayment = 0;
  setData.id_user = id;
  try {
    const result = await Transactions.create(setData);
    return response(res, true, result, 200);
  } catch (err) {
    console.log(err);
    return response(res, false, 'An error occured', 500);
  }
};

exports.proceedToPayment = async (req, res) => {
  const setData = req.body;
  const { id } = req.params;
  setData.isPayment = 1;
  try {
    const getTransaction = await Transactions.findByPk(id);
    const result = await Transactions.update(setData, {
      where: {
        id: getTransaction.dataValues.id,
      },
    });
    if (getTransaction.dataValues.isPayment === 1) {
      return response(res, false, 'paid', 400);
    }
    return response(res, true, result, 200);
  } catch (err) {
    console.log(err);
    return response(res, false, 'An error occured', 500);
  }
};

exports.getTransaction = async (req, res) => {
  let {
    search = '', sort, limit = 8, page = 1,
  } = req.query;
  const order = [];
  if (typeof sort === 'object') {
    const key = Object.keys(sort)[0];
    let value = sort[key];
    if (value === '1') {
      value = 'DESC';
    } else {
      value = 'ASC';
    }
    order.push([key, value]);
  }
  if (typeof limit === 'string') {
    limit = parseInt(limit);
  }
  if (typeof page === 'string') {
    page = parseInt(page);
  }
  const count = await Transactions.count();
  const nextPage = page < Math.ceil(count / limit) ? `/transactions/transaction?page=${page + 1}` : null;
  const prevPage = page > 1 ? `/transactions/transaction?page=${page - 1}` : null;
  const transaction = await Transactions.findAll({
    where: {
      id_user: {
        [Op.substring]: req.authUser.id,
      },
    },
    include: [
      {
        model: Tickets,
        include: airlinesModel,
      },
    ],
    order,
    limit,
    offset: (page - 1) * limit,
  });
  return res.status(200).json({
    success: true,
    message: 'transaction list',
    results: transaction,
    pageInfo: {
      totalPage: Math.ceil(count / limit),
      currentPage: page,
      nextLink: nextPage,
      prevLink: prevPage,
    },
  });
};

exports.getTransactionDetail = async (req, res) => {
  const { id } = req.params;
  const transaction = await Transactions.findAll({
    where: {
      id: {
        [Op.substring]: id,
      },
    },
    include: [
      {
        model: Tickets,
        include: airlinesModel,
      },
    ],
  });
  return res.status(200).json({
    success: true,
    message: 'transaction details',
    results: transaction,
  });
};
