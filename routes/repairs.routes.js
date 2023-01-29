const { Router } = require('express');
const {
  findAllRepairs,
  createRepair,
  updateRepair,
  deleteRepair,
  findRepair,
} = require('../controllers/repairs.controllers');

const router = Router();

router.get('', findAllRepairs);
router.get('/:id', findRepair);
router.post('', createRepair);
router.patch('/:id', updateRepair);
router.delete('/:id', deleteRepair);

module.exports = {
  repairsRouter: router,
};
