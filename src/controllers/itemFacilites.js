/* eslint-disable no-console */
const { response } = require('../helpers/response');
const ItemFacilities = require('../model/itemFacilities');
const facilities = require('../model/facilities');
// const tickets = require('../model/tickets');

exports.createItemFacilities = async (req, res) => {
  try {
    const result = await ItemFacilities.create(req.body);
    return response(res, true, result, 200);
  } catch (err) {
    console.log(err);
    return response(res, false, 'An error occured', 500);
  }
};

exports.getItemFacilites = async (_req, res) => {
  try {
    const result = await ItemFacilities.findAll({
      include: [facilities],
    });
    return response(res, true, result, 200);
  } catch (err) {
    console.log(err);
    return response(res, false, 'An error occured', 500);
  }
};
