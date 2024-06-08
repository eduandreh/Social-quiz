import bsqlite3 from "better-sqlite3";
const DBSOURCE = "./socialQuiz.sqlite";
import bcrypt from "bcrypt";

const db2 = bsqlite3(DBSOURCE);

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

export function updateUser(id_user, toUpdate) {
  const keys = Object.keys(toUpdate);
  const values = Object.values(toUpdate);
  const stringKeys = keys.map((x) => `${x} = ?`).join(" , ");
  const result = db2
    .prepare(`UPDATE users SET ${stringKeys} where id_user = ?`)
    .run(...values, id_user);
  return result;
}

export function deleteUser(id_user) {
  const result = db2.prepare(`DELETE FROM users WHERE id_user = ?`).run(id_user);
  return result;
}