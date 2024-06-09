import {
  addInteraction,
  addComment,
  deleteComment,
  getQuestionDetails,
} from '../models/feedback.database.js';

export const addLikeController = (req, res, next) => {
  const { id_question } = req.params;
  const id_user = req.USER_ID;
  try {
    const result = addInteraction(id_question, id_user, 'like');
    res.status(200).json({ message: `Like ${result.status}` });
  } catch (error) {
    next(error);
  }
};

export const addDislikeController = (req, res, next) => {
  const { id_question } = req.params;
  const id_user = req.USER_ID;
  try {
    const result = addInteraction(id_question, id_user, 'dislike');
    res.status(200).json({ message: `Dislike ${result.status}` });
  } catch (error) {
    next(error);
  }
};

export const addCommentController = (req, res, next) => {
  const { id_question } = req.params;
  const id_user = req.USER_ID;
  const { text } = req.body;
  try {
    const result = addComment(id_question, id_user, text);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteCommentController = (req, res, next) => {
  const { id_comment } = req.params;
  try {
    const result = deleteComment(id_comment);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getQuestionDetailsController = (req, res, next) => {
  const { id_question } = req.params;
  try {
    const result = getQuestionDetails(id_question);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
