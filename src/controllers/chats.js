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
  const newData = {
    isLatest: 0,
  };
  console.log(setData.attachment, 'test file');

  try {
    if (req.file) {
      setData.attachment = `${APP_UPLOAD_ROUTE}/${req.file.filename}`;
    } else {
      setData.attachment = null;
    }
    await Chats.update(newData, {
      where: {
        sender: {
          [Op.in]: [setData.sender, id],
        },
        [Op.and]: {
          recipient: {
            [Op.in]: [setData.sender, id],
          },
        },
      },
    }, (err, updateRes) => {
      if (!err) return response(res, true, updateRes, 200);
      return updateRes;
    });
    const result = await Chats.create(setData);
    return response(res, true, result, 200);
  } catch (err) {
    console.log(err);
    return response(res, false, 'An error occured', 500);
  }
};

exports.getChatRoom = async (req, res) => {
  const { id } = req.params;
  const sender = req.authUser.id;
  try {
    const result = await Chats.findAll({
      where: {
        sender: {
          [Op.in]: [sender, id],
        },
        [Op.and]: {
          recipient: {
            [Op.in]: [sender, id],
          },
        },
      },
    });
    return response(res, true, result, 200);
  } catch (err) {
    console.log(err);
    return response(res, false, 'An error occured', 500);
  }
};

exports.getLatestUserChat = async (req, res) => {
  try {
    const chat = await Chats.findAll({
      order: [['id', 'DESC']],
      where: {
        [Op.or]: [{ sender: req.authUser.id }, { recipient: req.authUser.id }],
        [Op.and]: [{ isLatest: 1 }],
      },
    });
    return response(res, true, chat, 200);
  } catch (err) {
    return response(res, false, 'An error occured', 500);
  }
};

exports.deleteChat = async (req, res) => {
  const { id } = req.params;
  const sender = req.authUser.id;
  try {
    const chat = await Chats.findByPk(req.body.chatId);
    await chat.destroy();
    const chats = await Chats.findAll({
      order: [['createdAt', 'DESC']],
      where: {
        sender: {
          [Op.in]: [sender, id],
        },
        [Op.and]: {
          recipient: {
            [Op.in]: [id, sender],
          },
        },
        isLatest: 0,
      },
      limit: 1,
    });
    console.log(chats[0].isLatest);
    chats[0].isLatest = true;
    await chats[0].save();
    return response(res, true, chats, 200);
  } catch (error) {
    return response(res, false, 'An error occured', 500);
  }
};
