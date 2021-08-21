/* eslint-disable no-console */
const { response } = require('../helpers/response');
const Transactions = require('../model/transactions');

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
