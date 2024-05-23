import express from "express";

const router = express.Router({ mergeParams: true });

import {
    sendAnswerController,
    getQuestionController,
    insertQuestionController
  } from "../controllers/questions.controller.js";

// publico
router.get("/", getQuestionController);

// privado
router.post("/", insertQuestionController);
router.post("/:id", sendAnswerController);
//router.put("/:id", updateUserController);
//router.delete("/:id", deleteUserController);

export default router;