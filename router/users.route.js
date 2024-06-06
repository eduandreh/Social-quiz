// voy a considerar que estoy en: /todos
import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router({});

import {
  allUsersController,
  getUsersController,
  insertUserController,
//   updateUserController,
//   deleteUserController,
} from "../controllers/users.controller.js";


function middlewareGenericErrorLogging(err, req, res, next) {
  console.log("Error: " + err.msg + "!!!");
  next(err);
}

function middlewareGenericError(err, req, res, next) {
  res.status(err.status).json({ error: "Ups! algo ha pasado: " + err.msg });
}

// router.use(middlewareUsers)
router.use(middlewareGenericErrorLogging);
router.use(middlewareGenericError);

// publico
router.post("/", insertUserController);

// privado
router.use(verifyToken);
router.get("/", allUsersController);
router.get("/:id", getUsersController);
// router.put("/:id", updateUserController);
// router.delete("/:id", deleteUserController);


export default router;
