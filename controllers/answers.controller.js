import { sendAnswer } from '../models/answers.database.js';

export const sendAnswerController = (req, res, next) => {
  const id = req.params.id_question;
  const answer = req.body.answer;

  try {
    const result = sendAnswer(id, answer);
    if (result) {
      res.status(200).send('Correcto! :)');
    } else {
      const error = new Error(
        'Respuesta incorrecta. Intente de nuevo o solicite una pista.',
      );
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};
