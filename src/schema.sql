DROP DATABASE IF EXISTS fakepostsdb41;
CREATE DATABASE fakepostsdb41;
-- move into the db
\c fakepostsdb41

-- users table`
CREATE TABLE IF NOT EXISTS person(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    username VARCHAR(255),
    email VARCHAR(255),
    address JSON,
    phone VARCHAR(255),
    website VARCHAR(255),
    company JSON
);
-- posts table
CREATE TABLE IF NOT EXISTS post(
    userid INTEGER,
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    body VARCHAR(255),
    FOREIGN KEY (userid) REFERENCES person (id) ON DELETE CASCADE
);
-- comments table
CREATE TABLE IF NOT EXISTS comment(
    postid INTEGER,
    userid INTEGER,
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT,
    body TEXT,
    FOREIGN KEY (postid) REFERENCES post (id) ON DELETE CASCADE,
    FOREIGN KEY (userid) REFERENCES person (id) ON DELETE CASCADE
);