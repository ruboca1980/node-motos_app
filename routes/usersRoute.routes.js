const express = require('express');

//controllers
const userController = require('./../controllers/users.controller');
const authController = require('./../controllers/auth.controller');

//middlewares
const userMiddleware = require('./../middlewares/user.middleware');
const validationMiddleware = require('./../middlewares/validations.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

router.get('/', userController.findAll);

router
  .route('/:id')
  .get(userMiddleware.validIfExistUser, userController.findOne)
  .patch(
    userMiddleware.validIfExistUser,
    validationMiddleware.updateUserValidation,
    authMiddleware.protectAccountOwner,
    userController.upDateUser
  )
  .delete(
    userMiddleware.validIfExistUser,
    authMiddleware.protectAccountOwner,
    authMiddleware.restrictTo('employee'),
    userController.deleteUser
  );

router.patch(
  '/password/:id',
  validationMiddleware.updatedPasswordValidation,
  userMiddleware.validIfExistUser,
  authMiddleware.protectAccountOwner,
  authController.updatedPassword
);

module.exports = router;
