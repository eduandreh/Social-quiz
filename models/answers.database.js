import bsqlite3 from "better-sqlite3";
const DBSOURCE = "./socialQuiz.sqlite";


const db2 = bsqlite3(DBSOURCE);


export function sendAnswer(id, answer) {
  const result = db2.prepare("SELECT answer FROM questions WHERE id_question = ?").get(id);
  if (result) {
    return result.answer.toLowerCase() === answer.toLowerCase();
  }
  return false;
}

