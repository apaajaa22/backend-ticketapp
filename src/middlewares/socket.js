/* eslint-disable arrow-body-style */
module.exports = (io) => {
  return (req, res, next) => {
    req.socket = io;
    next();
  };
};
