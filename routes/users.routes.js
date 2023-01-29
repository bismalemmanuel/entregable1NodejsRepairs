const { Router } = require('express');
const {
  findAllUsers,
  createUser,
  updateUser,
  deleteUser,
  findUser,
} = require('../controllers/users.controllers');

const router = Router();

router.get('', findAllUsers);
router.get('/:id', findUser);
router.post('', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = {
  usersRouter: router,
};
