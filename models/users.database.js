import bsqlite3 from "better-sqlite3";
const DBSOURCE = "./socialQuiz.sqlite";
import bcrypt from "bcrypt";

const db2 = bsqlite3(DBSOURCE);

// router.get("/", getQuestionController);
// router.post("/", insertQuestionController);
// router.post("/:id", sendAnswerController);

export function allQuestionsByUser(id_user) {
  const result = db2.prepare("SELECT * FROM questions WHERE id_user=?").all(id_user);
  return result;
}

export function allUsers() {
  const result = db2.prepare("SELECT * FROM users").all();
  return result;
}

export function getUser(id) {
  const result = db2
    .prepare(`SELECT id, email, name FROM users WHERE id = ?`)
    .get(id);
  return result;
}

export async function insertUser(toInsert) {
  const { name, email, password } = toInsert;

  const saltRounds = 10;
  const myPlaintextPassword = password;
  const hash = await bcrypt.hash(myPlaintextPassword, saltRounds);

  const result = db2
    .prepare(`INSERT INTO users (name , email , password) VALUES (? , ? , ?)`)
    .run(name, email, hash);

  return result;
}

export async function authenticate(email, password) {
  const result = db2.prepare(`SELECT * FROM users WHERE email = ?`).get(email);

  console.log(result);

  if (!result) return false;

  try {
    if (await bcrypt.compare(password, result.password)) {
      return result;
    }
  } catch (ex) {
    return false;
  }
}