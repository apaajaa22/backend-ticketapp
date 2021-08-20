/* eslint-disable consistent-return */
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(process.cwd(), 'assets', 'images'));
  },
  filename(req, file, cb) {
    const ext = file.originalname.split('.')[1];
    const date = new Date();
    cb(null, `${date.getTime()}.${ext}`);
  },
});

const upload = multer({
  storage,
  fileFilter(req, file, callback) {
    const ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(new Error('Only images are allowed'));
    }
    callback(null, true);
  },
  limits: { fileSize: 1024 * 1024 * 2 },
}).single('picture');

const uploadFilter = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    } if (err) {
      // An unknown error occurred when uploading.
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
    next();
    // Everything went fine.
  });
};

module.exports = uploadFilter;
