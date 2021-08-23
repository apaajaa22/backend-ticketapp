/* eslint-disable no-console */
/* eslint-disable prefer-const */
/* eslint-disable radix */
const { Op } = require('sequelize');
const ticketsModel = require('../model/tickets');
const airLinesModel = require('../model/airlines');
const { response } = require('../helpers/response');
const facilities = require('../model/facilities');
const ItemFacilities = require('../model/itemFacilities');

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

exports.createTickets = async (req, res) => {
  const tickets = await ticketsModel.create({
    id_airlines: req.body.id_airlines,
    departure: req.body.departure,
    code_departure: req.body.code_departure,
    destination: req.body.destination,
    code_destination: req.body.code_destination,
    departure_time: req.body.departure_time,
    arrival_time: req.body.arrival_time,
    price: req.body.price,
    transit: req.body.transit,
    id_item_facilities: req.body.id_item_facilities,
    class: req.body.class,
    terminal: req.body.terminal,
    seat: req.body.seat,
    gate: req.body.gate,
  });
  return res.status(200).json({
    success: true,
    message: 'tickets created successfully',
    results: tickets,
  });
};

exports.getTickets = async (req, res) => {
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
  const count = await ticketsModel.count();
  const nextPage = page < Math.ceil(count / limit) ? `/tickets/tickets?page=${page + 1}` : null;
  const prevPage = page > 1 ? `/tickets/tickets?page=${page - 1}` : null;
  const tickets = await ticketsModel.findAll({
    where: {
      destination: {
        [Op.substring]: search,
      },
    },
    attributes: { exclude: ['id_airlines'] },
    include: [
      airLinesModel,
      {
        model: ItemFacilities,
        include: [facilities],
      },
    ],
    order,
    limit,
    offset: (page - 1) * limit,
  });
  return res.status(200).json({
    success: true,
    message: 'tickets created successfully',
    results: tickets,
    pageInfo: {
      totalPage: Math.ceil(count / limit),
      currentPage: page,
      nextLink: nextPage,
      prevLink: prevPage,
    },
  });
};

exports.deleteTickets = async (req, res) => {
  const { id } = req.params;
  const tickets = await ticketsModel.findByPk(id);
  await tickets.destroy();
  return res.status(200).json({
    success: true,
    message: 'tickets has been deleted',
    results: tickets,
  });
};
