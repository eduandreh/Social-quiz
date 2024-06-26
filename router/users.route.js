// /questions
import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';

import routeQuestions from './users/questions.route.js';

import { verifyUserSchema } from '../middleware/users/verifySchema.js';

const router = express.Router({});

import {
  allUsersController,
  getUsersController,
  insertUserController,
  updateUserController,
  deleteUserController,
} from '../controllers/users.controller.js';

function middlewareGenericErrorLogging(err, req, res, next) {
  console.log('Error: ' + err.msg + '!!!');
  next(err);
}

function middlewareGenericError(err, req, res, next) {
  res.status(err.status).json({ error: 'Ups! algo ha pasado: ' + err.msg });
}

router.use(middlewareGenericErrorLogging);
router.use(middlewareGenericError);

router.post('/', verifyUserSchema, insertUserController);

router.use(verifyToken);
router.get('/', allUsersController);
router.get('/:id', getUsersController);
router.put('/:id_user', verifyUserSchema, updateUserController);
router.delete('/:id_user', deleteUserController);

router.use('/:id_user/questions', routeQuestions);

export default router;
