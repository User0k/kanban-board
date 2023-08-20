const express = require('express');
const userRouter = express.Router();
const {
  getUser,
  getUsersByIds,
  getAllUsers,
  deleteUser,
  updateUserName,
  assignUser,
  unassignUser,
} = require('../controllers/userController');

userRouter.get('/:id', getUser);
userRouter.post('/choose-users', getUsersByIds);
userRouter.get('/', getAllUsers);
userRouter.patch('/:id', updateUserName);
userRouter.delete('/:id', deleteUser);
userRouter.post('/:id/assign', assignUser);
userRouter.delete('/:id/assign', unassignUser);

module.exports = userRouter;
