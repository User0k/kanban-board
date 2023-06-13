const express = require('express');
const userRouter = express.Router();
const {
  getUser,
  getAllUsers,
  deleteUser,
  updateUserName,
} = require('../controllers/userController');

userRouter.get('/:id', getUser);
userRouter.get('/', getAllUsers);
userRouter.patch('/:id', updateUserName);
userRouter.delete('/:id', deleteUser);

module.exports = userRouter;
