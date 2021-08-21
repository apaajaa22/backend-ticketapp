/* eslint-disable no-console */
const { response } = require('../helpers/response');
const Ticket = require('../model/tickets');

exports.updateTicket = async (req, res) => {
  const setData = req.body;
  const ticketId = req.params.id;
  try {
    const result = await Ticket.update(setData, {
      where: {
        id: ticketId,
      },
    });
    return response(res, true, result, 200);
  } catch (err) {
    console.log(err);
    return response(res, false, 'An error occured', 500);
  }
};
