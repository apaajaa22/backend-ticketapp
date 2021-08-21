const tickets = require('express').Router();

const {
  createTickets, getTickets, deleteTickets, updateTicket,
} = require('../controllers/tickets');
// const upload = require('../helpers/upload');

tickets.put('/update-ticket/:id', updateTicket);
tickets.post('/create-tickets', createTickets);
tickets.get('/tickets', getTickets);
tickets.delete('/tickets/:id', deleteTickets);

module.exports = tickets;
