DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id_user INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT
);

DROP TABLE IF EXISTS movies;
CREATE TABLE movies (
    id_movie INTEGER PRIMARY KEY AUTOINCREMENT,
    movie_name TEXT,
    categoria TEXT
);


DROP TABLE IF EXISTS questions;
CREATE TABLE questions (
    id_question INTEGER PRIMARY KEY AUTOINCREMENT,
    id_user INTEGER,
    emojis TEXT,
    answer TEXT,
    id_movie INTEGER,
    is_private BOOLEAN,
    hint TEXT
);

INSERT INTO questions (emojis, answer, id_movie, is_private) VALUES ('🔕🐑🐑🐑', 'El silencio de los corderos', 1, 0);
INSERT INTO questions (emojis, answer, id_movie, is_private) VALUES ('💍💍💍💍⚰️', 'Cuatro bodas y un funeral', 2, 0);
INSERT INTO questions (emojis, answer, id_movie, is_private) VALUES ('🏝️🏐', 'Naufrago', 3, 0);



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
