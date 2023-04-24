const catchAsync = require('../utils/catchAsync');
const Repair = require('../models/repairs.model');
const AppError = require('../utils/appError');
const User = require('../models/users.model');

exports.existRepair = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const repair = await Repair.findOne({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    where: {
      id,
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

  if (!repair) return next(new AppError('Repair not found', 404));

  req.repair = repair;
  req.user = repair.user;
  next();
});
