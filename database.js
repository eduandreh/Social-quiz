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
  const result = db2.prepare("SELECT answer FROM questions WHERE id = ?").get(id);
  return result?.answer === answer;
}

export async function insertQuestion(toInsert, clue) {
  const { emojis, answer, is_private } = toInsert;
  const hint = clue;
    const result = db2
        .prepare(
        "INSERT INTO questions (emojis, answer, is_private, hint) VALUES (?, ?, ?, ?)")
        .run(emojis, answer, is_private, hint);
    return result;
}
