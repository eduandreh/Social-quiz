import { validateUserSchema } from "../../schemas/users.schema.js";

export function verifyUserSchema(req, res, next) {
  try {
    validateUserSchema(req.body);
    next();
  } catch (ex) {
    next(ex);
  }
}