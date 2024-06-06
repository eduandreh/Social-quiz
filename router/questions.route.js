import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router({ mergeParams: true });

import {
    sendAnswerController,
    getQuestionController,
    insertQuestionController
  } from "../controllers/questions.controller.js";

// publico
router.get("/", getQuestionController);
router.post("/:id", sendAnswerController);

// privado
router.use(verifyToken);
router.post("/", insertQuestionController);
//router.put("/:id", updateUserController);
//router.delete("/:id", deleteUserController);

export default router;