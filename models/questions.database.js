import bsqlite3 from "better-sqlite3";
const DBSOURCE = "./socialQuiz.sqlite";

const db2 = bsqlite3(DBSOURCE);

// router.get("/", getQuestionController);
// router.post("/", insertQuestionController);
// router.post("/:id", sendAnswerController);

export function getQuestion() {
  const result = db2.prepare("SELECT * FROM questions WHERE is_private = 0 ORDER BY RANDOM() LIMIT 1").get();
  return result;
}

export function sendAnswer(id, answer) {
  const result = db2.prepare("SELECT answer FROM questions WHERE id_question = ?").get(id);
  return result?.answer === answer;
}

export async function insertQuestion(toInsert, hint, id_user) {
  const { emojis, answer, is_private } = toInsert;
    const result = db2
        .prepare(
        "INSERT INTO questions (emojis, answer, is_private, hint, id_user) VALUES (?, ?, ?, ?, ?)")
        .run(emojis, answer, is_private, hint, id_user);
    return result;
}

export function allQuestionsByUser(id_user) {
  const result = db2.prepare("SELECT * FROM questions WHERE id_user=?").all(id_user);
  return result;
}

