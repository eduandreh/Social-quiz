//  /users/:id/questions

import express from "express";
const router = express.Router({ mergeParams: true });

import {
   getQuestionsByUserController,
   updateQuestionController,
    deleteQuestionController
  } from "../../controllers/questions.controller.js";

import { authorizate } from "../../middleware/verifyToken.js";

function changeAtMeToUserId(req, res, next) {
  if (req.params.id_user === "@me") req.params.id_user = req.USER_ID;
  next();
}

router.get("/", changeAtMeToUserId, authorizate, getQuestionsByUserController);

router.put("/:id_question", changeAtMeToUserId, authorizate, updateQuestionController);

router.delete("/:id_question", changeAtMeToUserId, authorizate, deleteQuestionController);


export default router;
