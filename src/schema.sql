DROP DATABASE IF EXISTS fakepostsdb;
CREATE DATABASE fakepostsdb;
-- move into the db
\c fakepostsdb

-- users table
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
   userId INTEGER,
   id SERIAL PRIMARY KEY,
   title VARCHAR(255),
   body VARCHAR(255),
   FOREIGN KEY (userId) REFERENCES person (id)
);

-- comments table
CREATE TABLE IF NOT EXISTS comment(
   postId INTEGER,
   id SERIAL PRIMARY KEY,
   name TEXT,
   email TEXT,
   body TEXT,
   FOREIGN KEY (postId) REFERENCES post (id)
);