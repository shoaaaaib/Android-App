const express = require("express");
const EAH = require("express-async-handler");
const User = require("../Models/user");

/////Register User

exports.register = EAH(async (req, res) => {
  //// Create user
  console.log(req.file);
  console.log(req.body);
  const user = await User.create({ ...req.body, avtar: req.file.path });
  return res.status(201).json({
    error: false,
    data: user,
  });
});

//////Login User
exports.login = EAH(async (req, res) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return res.json({ msg: "All fields are required" });
  }

  // Check for user
  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ msg: "No user with this email!" });
  }

  // Check if password matches
  const isMatch = await bcrypt.compare(password, user.password);
  console.log(isMatch);
  if (!isMatch) {
    return res.json({ msg: "Invalid credential" });
  } else {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.status(200).json({
      error: false,
      user,
      token,
    });
  }
});

//// Get all users

exports.getUsers = EAH(async (req, res, next) => {
  const user = await User.find();
  return res.json({
    error: false,
    data: user,
  });
});

////Get single user

exports.getUser = EAH(async (req, res, next) => {
  const user = await User.findById(req.params._id);
  res.status(200).json({
    success: true,
    data: user,
  });
});

// //    Update user
exports.updateUser = EAH(async (req, res, next) => {
  console.log(req.body.address[0].add_type);
  const address = await User.find({
    address: { $elemMatch: { add_type: req.body.address[0].add_type } },
    _id: req.params._id,
  });

  console.log(address);
  if (address.length) {
    await User.update(
      {
        address: { $elemMatch: { add_type: req.body.address[0].add_type } },
        _id: req.params._id,
      },
      { $set: { "address.$": req.body.address[0] } }
    );
  } else {
    await User.findByIdAndUpdate(
      req.params._id,
      { $push: req.body },
      { returnOriginal: false }
    );
  }
  res.status(200).json({
    success: true,
    data: address,
  });
});

////Delete user

exports.deleteUser = EAH(async (req, res, next) => {
  await User.deleteOne({
    _id: req.params._id,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});
