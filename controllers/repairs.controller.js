const Repair = require('../models/repairs.model');
const User = require('../models/users.model');
const { db } = require('./../database/config');
const catchAsync = require('../utils/catchAsync');

exports.findAllRepair = catchAsync(async (req, res) => {
  const repairs = await Repair.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    where: {
      status: 'pending',
    },
    include: [
      {
        model: User,
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'passwordChangeAt', 'password'],
        },
        where: {
          status: 'available',
        },
      },
    ],
  });

  res.status(200).json({
    message: 'The query has been successs',
    results: repairs.length,
    repairs,
  });
});

exports.repairById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const repair = await Repair.findOne({
    where: {
      id,
      status: 'pending',
    },
  });

  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: 'the repair not found',
    });
  }

  res.status(200).json({
    message: 'The query has been done success',
    repair,
  });
});

exports.repairUpDate = catchAsync(async (req, res) => {
  const { id } = req.params;

  const repair = await Repair.findOne({
    where: {
      id,
      status: 'pending',
    },
  });

  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: 'the user not found',
    });
  }

  await repair.update({
    status: 'completed',
  });

  res.json({
    message: 'The repair has been update',
  });
});

exports.createRepair = catchAsync(async (req, res) => {
  const { date, userId, motorsNumber, description } = req.body;

  const repair = await Repair.create({
    date,
    userId,
    motorsNumber,
    description,
  });

  res.status(201).json({
    status: 'success',
    message: 'The repair has been created!',
    repair,
  });
});

exports.deleteRepair = catchAsync(async (req, res) => {
  const { id } = req.params;

  const repair = await Repair.findOne({
    where: {
      id,
      status: 'pending',
    },
  });

  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: 'the repair not found',
    });
  }

  await repair.update({
    status: 'cancelled',
  });

  res.json({
    stattus: 'succses',
    message: 'The repair has been delete',
  });
});

exports.findMyRepair = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const query = `SELECT * FROM posts WHERE "userId" = ${sessionUser.id} AND status = 'active'`;

  const [rows, fields] = await db.query(query, {
    replacements: {
      idusuario: sessionUser.id,
      status: 'active',
    },
  });

  res.status(200).json({
    status: 'success',
    results: fields.rowCount,
    posts: rows,
  });
});
