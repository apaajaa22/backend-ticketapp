/* eslint-disable no-console */
const { response } = require('../helpers/response');
const notifications = require('../model/notifications');
const UserModel = require('../model/users');

exports.createNotification = async (req, res) => {
  try {
    const result = await notifications.create(req.body);
    return response(res, true, result, 200);
  } catch (err) {
    console.log(err);
    return response(res, false, 'An error occured', 500);
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const notif = await notifications.findAll({
      order: [
        ['createdAt', 'DESC'],
      ],
      where: {
        userId: req.authUser.id,
      },
      include: {
        model: UserModel,
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'email', 'password'],
        },
        as: 'userDetail',
      },
    });
    return response(res, true, notif, 200);
  } catch (error) {
    return response(res, false, 'An error occured', 500);
  }
};

exports.deleteNotifications = async (req, res) => {
  try {
    const notif = await notifications.findOne({
      where: {
        id: req.body.notifId,
      },
    });
    return response(res, true, notif, 200);
  } catch (error) {
    return response(res, false, 'An error occured', 500);
  }
};
