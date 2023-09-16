const express = require('express');
const userRouter = express.Router();
const { validateEmail, validateName } = require('../helpers/validationTools');
const {
  getUser,
  getUsersByIds,
  getAllUsers,
  deleteUser,
  updateUser,
  assignUser,
  unassignUser,
} = require('../controllers/userController');

userRouter.get('/:id', getUser);
userRouter.post('/choose-users', getUsersByIds);
userRouter.get('/', getAllUsers);
userRouter.patch('/:id', validateEmail, validateName, updateUser);
userRouter.delete('/:id', deleteUser);
userRouter.post('/:id/assign', assignUser);
userRouter.delete('/:id/assign', unassignUser);

module.exports = userRouter;
