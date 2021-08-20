const airlines = require('express').Router();
const {
  createAirlines, getAirlines, updateAirlines, deleteAirlines,
} = require('../controllers/airlines');
const upload = require('../helpers/upload');

airlines.get('/airlines', upload, getAirlines);
airlines.post('/create-airlines', upload, createAirlines);
airlines.put('/update-airlines/:id', upload, updateAirlines);
airlines.delete('/airlines/:id', deleteAirlines);
module.exports = airlines;
