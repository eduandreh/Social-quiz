import Joi from "joi";

const schema = Joi.object({
  text: Joi.string().min(1).max(300).required(),
});

export function validateCommentSchema(comment) {
  const { value, error } = schema.validate(comment);

  if (error) {
    throw error;
  }

  return value;
}