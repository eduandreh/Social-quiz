// /questions/:id/

import express from "express";
const router = express.Router({ mergeParams: true });

import { verifyCommentSchema } from "../../middleware/feedback/verifySchema.js";

import {
  addLikeController,
    addDislikeController,
    addCommentController,
    deleteCommentController
  } from "../../controllers/feedback.controller.js";

router.post("/like", addLikeController);

router.post("/dislike", addDislikeController);

router.post("/comment", verifyCommentSchema, addCommentController);
router.delete("/comment/:id_comment", deleteCommentController);

export default router;
