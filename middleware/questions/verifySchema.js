import { validateQuestionSchema } from "../../schemas/questions.schema.js";

export function verifyQuestionSchema(req, res, next) {
  try {
    validateQuestionSchema(req.body);
    next();
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
}