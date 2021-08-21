/* eslint-disable no-console */
const { Op } = require('sequelize');
const { response } = require('../helpers/response');
const Chats = require('../model/chats');

const { APP_UPLOAD_ROUTE } = process.env;

exports.createChat = async (req, res) => {
  const setData = req.body;
  const { id } = req.params;
  setData.recipient = id;
  setData.isLatest = 1;
  setData.sender = req.authUser.id;
  console.log(setData.attachment, 'test file');

  try {
    if (req.file) {
      setData.attachment = `${APP_UPLOAD_ROUTE}/${req.file.filename}`;
    } else {
      setData.attachment = null;
    }
    const getChat = await Chats.findOne({
      where: {
        sender: {
          [Op.in]: [setData.sender, id],
        },
        [Op.and]: {
          recipient: {
            [Op.in]: [setData.sender, id],
          },
        },
        [Op.and]: {
          isLatest: true,
        },
      },
    });
    const result = await Chats.create(setData);
    if (getChat !== null) {
      getChat.set('isLatest', (0));
      await getChat.save();
    }
    return response(res, true, result, 200);
  } catch (err) {
    console.log(err);
    return response(res, false, 'An error occured', 500);
  }
};
