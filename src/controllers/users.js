/* eslint-disable no-console */
const { response } = require('../helpers/response');
const User = require('../model/user');

// const { APP_URL } = process.env;

module.exports = {
  updateUser: async (req, res) => {
    const setData = req.body;
    try {
      const getUser = await User.findByPk(1);
      if (req.file) {
        setData.picture = `${req.file.filename}`;
      } else {
        setData.picture = getUser.dataValues.picture;
      }
      const result = await User.update(setData, {
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
  },
};
