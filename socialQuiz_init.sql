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
    is_multiple_choice INTEGER DEFAULT 0,
    multiple_choice_answers TEXT,
    hint TEXT
);

INSERT INTO questions (emojis, answer, is_private, id_user) VALUES ('🔕🐑🐑🐑', 'El silencio de los corderos', 0, 1);
INSERT INTO questions (emojis, answer, is_private, id_user) VALUES ('💍💍💍💍⚰️', 'Cuatro bodas y un funeral', 0, 2);
INSERT INTO questions (emojis, answer, is_private, id_user) VALUES ('🏝️🏐', 'Naufrago', 0, 3);


DROP TABLE IF EXISTS multiple_choice_answers;

DROP TABLE IF EXISTS category;
CREATE TABLE category (
    id_category INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
);

INSERT INTO category (name) VALUES ('Terror');
INSERT INTO category (name) VALUES ('Comedia');
INSERT INTO category (name) VALUES ('Drama');
INSERT INTO category (name) VALUES ('Ciencia Ficcion');
INSERT INTO category (name) VALUES ('Aventuras');
INSERT INTO category (name) VALUES ('Romantica');
INSERT INTO category (name) VALUES ('Musical');
INSERT INTO category (name) VALUES ('Fantasia');

DROP TABLE IF EXISTS question_category;
CREATE TABLE question_category(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_question INTEGER,
    id_category INTEGER
);

INSERT INTO question_category (id_question, id_category) VALUES (1, 1);
INSERT INTO question_category (id_question, id_category) VALUES (2, 2);
INSERT INTO question_category (id_question, id_category) VALUES (3, 3);

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
