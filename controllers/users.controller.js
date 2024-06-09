import {
  allUsers,
  getUser,
  insertUser,
  updateUser,
  deleteUser,
} from '../models/users.database.js';

export const allUsersController = (req, res, next) => {
  res.json(allUsers());
};

export const getUsersController = (req, res, next) => {
  res.json(getUser(req.params.id));
};

export const insertUserController = async (req, res, next) => {
  const toInsert = req.body;
  try {
    res.json(await insertUser(toInsert));
  } catch (error) {
    next(error);
  }
};

export const updateUserController = (req, res, next) => {
  try {
    const id_user = req.params.id_user;
    const toUpdate = req.body;
    const result = updateUser(id_user, toUpdate);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteUserController = (req, res, next) => {
  try {
    const id_user = req.params.id_user;
    const result = deleteUser(id_user);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
