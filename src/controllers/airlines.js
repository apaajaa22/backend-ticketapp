const airlinesModel = require('../model/airlines');
const { response } = require('../helpers/response');

const { APP_UPLOAD_ROUTE } = process.env;

exports.createAirlines = async (req, res) => {
  if (req.file) {
    req.body.picture = `${APP_UPLOAD_ROUTE}/${req.file.filename}`;
  }
  const airlines = await airlinesModel.create({
    name: req.body.name,
    picture: req.body.picture,
  });
  return res.status(200).json({
    success: true,
    message: 'airline created successfully',
    results: airlines,
  });
};

exports.getAirlines = async (req, res) => {
  const airlines = await airlinesModel.findAll();
  return res.status(200).json({
    success: true,
    message: 'List airlines',
    results: airlines,
  });
};

exports.updateAirlines = async (req, res) => {
  const { id } = req.params;
  const airlines = await airlinesModel.findByPk(id);
  if (req.file) {
    req.body.picture = `${APP_UPLOAD_ROUTE}/${req.file.filename}`;
  }
  airlines.set(req.body);
  await airlines.save();
  return res.status(200).json({
    success: true,
    message: 'Airlines Updated Successfully',
    results: airlines,
  });
};

exports.deleteAirlines = async (req, res) => {
  const { id } = req.params;
  const user = await airlinesModel.findByPk(id);
  await user.destroy();
  return res.status(200).json({
    success: true,
    message: 'Airlines has been deleted',
    results: user,
  });
};
