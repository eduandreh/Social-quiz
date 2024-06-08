import express from "express";

import questionsRoute from "./router/questions.route.js";
import usersRoute from "./router/users.route.js";

import jwt from "jsonwebtoken";

import { authenticate } from "./models/users.database.js";

import { errorHandler } from "./middleware/errorHandler.js";

import { config } from "dotenv";

config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  const user = await authenticate(email, password);

  if (user) {
    const token = jwt.sign(
      {
        user: user.id_user,
      },
      process.env.JWT_SECRET_SIGN
    );

    res.json({ accessToken: token, userID: user.id_user });
  } else {
    next({
      statusCode: 404,
      message: "Email o contraseña incorrectos",
    });
  }
});

app.use("/questions", questionsRoute);

app.use("/users", usersRoute);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}/questions`);
    console.log(`http://localhost:${PORT}/users`);
    console.log(`http://localhost:${PORT}/questions/1`);
  });