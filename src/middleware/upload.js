const multer = require('multer');
const path = require('path');

const multerImg = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './src/img');
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Math.round(Math.random() * 1E9)}${ext}`);
    },
  }),
});

const upload = (req, res, next) => {
  const multerSingle = multerImg.single('img');
  multerSingle(req, res, (err) => {
    if (err) {
      res.json(err);
    } else {
      next();
    }
  });
};

module.exports = upload;
