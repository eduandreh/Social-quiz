import express from "express";

import questionsRoute from "./router/questions.route.js";
import usersRoute from "./router/users.route.js";

import { verifyToken } from "./middleware/verifyToken.js";

import jwt from "jsonwebtoken";

import { authenticate } from "./database.js";

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
        // exp: Math.floor(Date.now() / 1000) + 60,
      },
      process.env.JWT_SECRET_SIGN
    );

    res.status(200).json({ accessToken: token, userID: user.id_user });
  } else {
    res.status(404).json({ msg: "el usuario no existe" });
  }
});

app.use("/questions", questionsRoute);

app.use((err, req, res, next) => {
  console.log("err", err);
  next(err);
});

app.use("/users", usersRoute);

// privado

app.use(verifyToken);

app.get("/", (req, res, next) => {
  //vamos a verificar que el usuario se ha logueado:

  res.status(200).send("<h1>Hello World!</h1>");
});

app.use((err, req, res, next) => {
    res.status(500).json({ error: err });
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}/questions`);
    console.log(`http://localhost:${PORT}/users`);
    console.log(`http://localhost:${PORT}/questions/1`);
  });