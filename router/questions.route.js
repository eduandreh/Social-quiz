import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';

import { verifyQuestionSchema } from '../middleware/questions/verifySchema.js';

const router = express.Router({ mergeParams: true });

import {
  getRandomQuestionController,
  insertQuestionController,
  getHintController,
  getQuestionByCategoryController,
} from '../controllers/questions.controller.js';

import { sendAnswerController } from '../controllers/answers.controller.js';

import routeFeedback from './questions/feedback.route.js';

import { getQuestionDetailsController } from '../controllers/feedback.controller.js';

router.get('/', getRandomQuestionController);
router.post('/:id_question', sendAnswerController);
router.get('/:id_question', getQuestionDetailsController);
router.get('/:id_question/hint', getHintController);
router.get('/category/:id_category', getQuestionByCategoryController);

router.use(verifyToken);
router.post('/', verifyQuestionSchema, insertQuestionController);

router.use('/:id_question', routeFeedback);

export default router;




