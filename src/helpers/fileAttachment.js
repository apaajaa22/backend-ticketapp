const multer = require('multer');
const path = require('path');
const { response } = require('./response');

const maxSize = 1024 * 1024 * 1;

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, path.join(process.cwd(), 'assets', 'files'));
  },
  filename(_req, file, cb) {
    const ext = file.originalname.split('.')[1];
    const date = new Date();
    cb(null, `${date.getTime()}.${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: maxSize },
}).single('attachment');

const uploadFilter = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return response(res, false, err.message, 400);
    } if (err) {
      return response(res, false, err.message, 500);
    }
    next();
    return res;
  });
};

module.exports = uploadFilter;
