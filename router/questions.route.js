import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";

import { verifyQuestionSchema } from "../middleware/questions/verifySchema.js";

const router = express.Router({ mergeParams: true });

import {
    getRandomQuestionController,
    insertQuestionController,
    getQuestionController,
   getHintController
  } from "../controllers/questions.controller.js";

  import {
    sendAnswerController
  } from "../controllers/answers.controller.js";

// publico
router.get("/", getRandomQuestionController);
router.post("/:id_question", sendAnswerController);
router.get("/:id_question", getQuestionController);
router.get("/:id_question/hint", getHintController);

// privado
router.use(verifyToken);
router.post("/", verifyQuestionSchema, insertQuestionController);
//router.put("/:id", updateUserController);
//router.delete("/:id", deleteUserController);

export default router;