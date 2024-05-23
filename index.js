import express from "express";

import questionsRoute from "./router/questions.route.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/questions", questionsRoute);

app.use((err, req, res, next) => {
  console.log("err", err);
  next(err);
});

app.use((err, req, res, next) => {
  // console.log("err", err);
  res.status(500).json({ error: err });
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}/questions`);
    console.log(`http://localhost:${PORT}/users`);
    console.log(`http://localhost:${PORT}/questions/1`);
  });