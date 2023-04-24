const express = require('express');

//controllers
const repairController = require('./../controllers/repairs.controller');

//middlewares
const authMiddleware = require('../middlewares/auth.middleware');
const validationsMiddleware = require('../middlewares/validations.middleware');
const { existRepair } = require('../middlewares/repair.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

router
  .route('/')
  .get(repairController.findAllRepair)
  .post(
    validationsMiddleware.createRepairValidation,
    repairController.createRepair
  );

router.get('/me', repairController.findMyRepair);

router
  .use('/:id', existRepair)
  .route('/:id')
  .get(repairController.repairById)
  .patch(authMiddleware.protectAccountOwner, repairController.repairUpDate)
  // .patch(repairController.repairUpDate)
  .delete(authMiddleware.protectAccountOwner, repairController.deleteRepair);
// .delete(repairController.deleteRepair);

module.exports = router;
