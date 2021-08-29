/* eslint-disable consistent-return */
const multer = require('multer');
const path = require('path');

// const filePath = path.resolve();
const { response } = require('../helpers/response');

const maxSize = 1024 * 1024 * 2;

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    // console.log(`${filePath}\\assets\\images`, 'path');
    // console.log(path.join(process.cwd(), 'assets', 'images'), 'new path');
    cb(null, path.join(process.cwd(), 'assets', 'images'));
  },
  filename(_req, file, cb) {
    const ext = file.originalname.split('.')[1];
    const date = new Date();
    cb(null, `${date.getTime()}.${ext}`);
    // console.log(file, 'test file');
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: maxSize,
  },
}).single('picture');

const uploadFilter = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return response(res, false, err.message, 400);
    } if (err) {
      return response(res, false, err.message, 500);
    }
    next();
  });
};

module.exports = uploadFilter;
