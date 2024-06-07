import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  repeatPassword: Joi.ref("password"),
});

export function validateUserSchema(user) {
  console.log("validateUserSchema", user);
  const { value, error } = schema.validate(user);

  if (error) {
    throw error.name + ": " + error.details[0].message;
  }

  return value;
}
