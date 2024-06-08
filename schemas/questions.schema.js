import Joi from "joi";

const emojiPattern = /^(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])+$/;

const schema = Joi.object({
  
    emojis: Joi.string().pattern(emojiPattern),

    answer: Joi.string().min(1).max(30).required(),

    is_private: Joi.number().integer().min(0).max(1).required(),

  
});

export function validateQuestionSchema(question) {
  console.log("validateQuestionSchema", question);
  const { value, error } = schema.validate(question);

  if (error) {
    throw error;
  }

  return value;
}
