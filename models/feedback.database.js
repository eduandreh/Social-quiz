import bsqlite3 from 'better-sqlite3';
const DBSOURCE = './socialQuiz.sqlite';

const db2 = bsqlite3(DBSOURCE);

export function addInteraction(id_question, id_user, type) {
  const existingInteraction = db2
    .prepare(
      `SELECT * FROM interactions WHERE id_question = ? AND id_user = ? AND type = ?`,
    )
    .get(id_question, id_user, type);
  if (existingInteraction) {
    db2
      .prepare(`DELETE FROM interactions WHERE id_interaction = ?`)
      .run(existingInteraction.id_interaction);
    return { status: 'quitado' };
  } else {
    db2
      .prepare(
        `INSERT INTO interactions (id_question, id_user, type) VALUES (?, ?, ?)`,
      )
      .run(id_question, id_user, type);
    return { status: 'agregado' };
  }
}

export function addComment(id_question, id_user, comment) {
  const result = db2
    .prepare(
      `INSERT INTO comments (id_question, id_user, text) VALUES (?, ?, ?)`,
    )
    .run(id_question, id_user, comment);
  return result;
}

export function deleteComment(id_comment) {
  const result = db2
    .prepare(`DELETE FROM comments WHERE id_comment = ?`)
    .run(id_comment);
  return result;
}

export function getQuestionDetails(id_question) {
  const question = db2
    .prepare(`SELECT id_question, emojis FROM questions WHERE id_question = ?`)
    .get(id_question);

  const likes = db2
    .prepare(
      `SELECT COUNT(*) AS like_count FROM interactions WHERE id_question = ? AND type = 'like'`,
    )
    .get(id_question).like_count;
  const dislikes = db2
    .prepare(
      `SELECT COUNT(*) AS dislike_count FROM interactions WHERE id_question = ? AND type = 'dislike'`,
    )
    .get(id_question).dislike_count;
  const comments = db2
    .prepare(`SELECT * FROM comments WHERE id_question = ? ORDER BY created_at`)
    .all(id_question);

  return {
    ...question,
    likes,
    dislikes,
    comments,
  };
}
