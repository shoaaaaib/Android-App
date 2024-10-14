const express = require("express");
const {
  register,
  login,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../Controller/userController");
const router = express.Router();
const { multer, storage } = require("../utils/multer-engine");
var upload = multer({ storage });

router.route("/register").post(upload.single("file"), register);
router.route("/login").post(login);
router.route("/").get(getUsers);
router.route("/:_id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
