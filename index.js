/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');

const { PORT, APP_UPLOAD_ROUTE, APP_UPLOAD_PATH } = process.env;
const cors = require('cors');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});
const router = require('./src/routes');
const socket = require('./src/middlewares/socket');
const sequelize = require('./src/config/sequelize');

io.on('connection', () => {
  console.log('socket connection is exists');
});

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(socket(io));
app.use(APP_UPLOAD_ROUTE, express.static(APP_UPLOAD_PATH));
app.use('/', router);

server.listen(PORT, () => {
  console.log(`APP running on port ${PORT}`);
  sequelize.sync();
});
