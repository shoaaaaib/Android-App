const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./media");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
module.exports = {
  storage,
  multer,
};
