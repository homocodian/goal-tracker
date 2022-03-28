const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

// @desc    Register new user
// @route   POST api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const userExists = await User.findOne({ email: email }).exec();
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // create a user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Authenticate a user
// @route   POST api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).exec();
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    Update a user
// @route   PUT api/users
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  if (!req.body || !req.body.password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const { email, password, newPassword, name } = req.body;
  const user = await User.findById(req.user.id);

  // update user info
  if (user && (await bcrypt.compare(password, user.password))) {
    let hashedPassword = null;
    if (password && newPassword) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(newPassword, salt);
    }
    const updatedInfo = new UpdateUserInfo()
      .setPassword(hashedPassword)
      .setEmail(email)
      .setName(name);
    const updatedUserInfo = await User.findByIdAndUpdate(user.id, updatedInfo, {
      new: true,
    }).select("-password");
    res.status(200).json(updatedUserInfo);
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    Get a user data
// @route   GET api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
}

class UpdateUserInfo {
  constructor() {}
  setPassword(hashedPassword) {
    if (hashedPassword) {
      this.password = hashedPassword;
    }
    return this;
  }
  setEmail(email) {
    if (email) {
      this.email = email;
    }
    return this;
  }
  setName(name) {
    if (name) {
      this.name = name;
    }
    return this;
  }
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateUser,
};
