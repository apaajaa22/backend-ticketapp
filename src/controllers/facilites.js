/* eslint-disable no-console */
const { response } = require('../helpers/response');
const Facilities = require('../model/facilities');

exports.createFacilites = async (req, res) => {
  try {
    const result = await Facilities.create(req.body);
    return response(res, true, result, 200);
  } catch (err) {
    console.log(err);
    return response(res, false, 'An error occured', 500);
  }
};
