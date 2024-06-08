import { validateUserSchema } from "../../schemas/users.schema.js";

export function verifyUserSchema(req, res, next) {
  try {
    validateUserSchema(req.body);
    next();
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
}