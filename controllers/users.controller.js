const User = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');

exports.findAll = catchAsync(async (req, res) => {
  const users = await User.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'passwordChangeAt', 'password'],
    },
    where: {
      status: 'available',
    },
  });

  res.status(200).json({
    message: 'Successs',
    results: users.length,
    users,
  });
});
exports.findOne = catchAsync(async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
      status: 'available',
    },
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'the user not found',
    });
  }

  res.status(200).json({
    message: 'The query has been done success',
    user,
  });
});

exports.createUser = catchAsync(async (req, res) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  res.status(201).json({
    status: 'succes',
    message: 'The user has been created!',
    user,
  });
});

exports.upDateUser = catchAsync(async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
      status: 'available',
    },
  });

  const { name, email } = req.body;

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'The user not found',
    });
  }

  await user.update({
    name,
    email,
  });

  res.status(200).json({
    status: 'success',
    message: 'The user update',
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
      status: 'available',
    },
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'the user not found',
    });
  }

  await user.update({
    status: 'disabled',
  });

  res.status(200).json({
    message: 'The user has been deleted',
  });
});
