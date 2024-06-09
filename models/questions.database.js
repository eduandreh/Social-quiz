import bsqlite3 from 'better-sqlite3';
const DBSOURCE = './socialQuiz.sqlite';

const db2 = bsqlite3(DBSOURCE);

export function getRandomQuestion(mode) {
  let query;
  if (mode === 'multiplechoice') {
    query =
      'SELECT id_question, emojis, multiple_choice_answers FROM questions WHERE is_private = 0 AND is_multiple_choice = 1 ORDER BY RANDOM() LIMIT 1';
  } else {
    query =
      'SELECT id_question, emojis FROM questions WHERE is_private = 0 AND is_multiple_choice = 0 ORDER BY RANDOM() LIMIT 1';
  }
  const question = db2.prepare(query).get();

  return question;
}

export async function insertQuestion(toInsert, hint, id_user) {
  const {
    emojis,
    answer,
    is_private,
    is_multiple_choice,
    multiple_choice_answers,
  } = toInsert;

  const multipleChoiceAnswersJson = is_multiple_choice
    ? JSON.stringify(multiple_choice_answers)
    : null;

  const result = db2
    .prepare(
      'INSERT INTO questions (emojis, answer, is_private, hint, id_user, is_multiple_choice, multiple_choice_answers) VALUES (?, ?, ?, ?, ?, ?, ?)',
    )
    .run(
      emojis,
      answer,
      is_private,
      hint,
      id_user,
      is_multiple_choice,
      multipleChoiceAnswersJson,
    );

  return result;
}

export function insertCategory(id_question, id_category) {
  const result = db2
    .prepare(
      'INSERT INTO question_category (id_question, id_category) VALUES (?, ?)',
    )
    .run(id_question, id_category);
  return result;
}

export function getQuestionByCategory(id_category) {
  const query = `
  SELECT questions.id_question, questions.emojis
  FROM question_category
  INNER JOIN questions ON question_category.id_question = questions.id_question
  WHERE question_category.id_category = ?
  ORDER BY RANDOM()
  LIMIT 1;`;

  const questions = db2.prepare(query).all(id_category);

  return questions;
}

export function allQuestionsByUser(id_user) {
  const result = db2
    .prepare('SELECT * FROM questions WHERE id_user=?')
    .all(id_user);
  return result;
}

export function getHint(id_question) {
  const result = db2
    .prepare(
      'SELECT Hint FROM questions WHERE is_private = 0 AND id_question = ?',
    )
    .get(id_question);
  return result;
}

export function updateQuestion(id_question, toUpdate) {
  const keys = Object.keys(toUpdate);
  const values = Object.values(toUpdate);
  const stringKeys = keys.map((x) => `${x} = ?`).join(' , ');
  const result = db2
    .prepare(`UPDATE questions SET ${stringKeys} WHERE id_question = ?`)
    .run(...values, id_question);

  return result;
}

export function deleteQuestion(id_question) {
  const result = db2
    .prepare('DELETE FROM questions WHERE id_question = ?')
    .run(id_question);
  return result;
}
