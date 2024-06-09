import { validateCommentSchema } from "../../schemas/comments.schema.js";

export function verifyCommentSchema(req, res, next) {
  try {
    validateCommentSchema(req.body);
    next();
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
}