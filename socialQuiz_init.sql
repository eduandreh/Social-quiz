DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id_user INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT
);

INSERT INTO users (name, email, password) VALUES ('Pepe', 'pepe@gmail.com', '123456');
INSERT INTO users (name, email, password) VALUES ('Juan', 'juan@gmail.com', '123456');	
INSERT INTO users (name, email, password) VALUES ('Maria', 'maria@gmail.com', '123456');


DROP TABLE IF EXISTS questions;
CREATE TABLE questions (
    id_question INTEGER PRIMARY KEY AUTOINCREMENT,
    id_user INTEGER,
    emojis TEXT,
    answer TEXT,
    is_private INTEGER DEFAULT 0,
    hint TEXT,
    is_multiple_choice INTEGER DEFAULT 0
);

INSERT INTO questions (emojis, answer, id_movie, is_private, id_user) VALUES ('🔕🐑🐑🐑', 'El silencio de los corderos', 1, 0);
INSERT INTO questions (emojis, answer, id_movie, is_private, id_user) VALUES ('💍💍💍💍⚰️', 'Cuatro bodas y un funeral', 2, 0);
INSERT INTO questions (emojis, answer, id_movie, is_private, id_user) VALUES ('🏝️🏐', 'Naufrago', 3, 0);


DROP TABLE IF EXISTS multiple_choice_answers;
CREATE TABLE multiple_choice_answers (
    id_answer INTEGER PRIMARY KEY AUTOINCREMENT,
    id_question INTEGER,
    answer TEXT,
    FOREIGN KEY (id_question) REFERENCES questions(id_question)
);

DROP TABLE IF EXISTS category;
CREATE TABLE category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
);

DROP TABLE IF EXISTS question_category;
CREATE TABLE question_category(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    questionId INTEGER,
    categoryId INTEGER
);



DROP TABLE IF EXISTS comments;
CREATE TABLE comments (
    id_comment INTEGER PRIMARY KEY AUTOINCREMENT,
    id_user INTEGER,
    id_question INTEGER,
    text TEXT

);

DROP TABLE IF EXISTS likes;
CREATE TABLE likes (
    id_like INTEGER PRIMARY KEY AUTOINCREMENT,
    id_dislike INTEGER,
    id_question INTEGER,
    id_user INTEGER
);
