import Joi from "joi";

const emojiPattern = /^(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])+$/;

const multipleChoiceAnswerSchema = Joi.array().items(
  Joi.string().required()
).min(4).max(4).required();

const schema = Joi.object({
  
    emojis: Joi.string().pattern(emojiPattern),

    answer: Joi.string().min(1).max(30).required(),

    is_private: Joi.number().integer().valid(0, 1).required(),

    is_multiple_choice: Joi.number().integer().valid(0, 1),

    id_category: Joi.number().integer(),

  multiple_choice_answers: Joi.when('is_multiple_choice', {
    is: 1,
    then: multipleChoiceAnswerSchema,
    otherwise: Joi.forbidden()
  })
  
});

export function validateQuestionSchema(question) {
  console.log("validateQuestionSchema", question);
  const { value, error } = schema.validate(question);

  if (error) {
    throw error;
  }

  return value;
}
