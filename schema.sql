DROP DATABASE IF EXISTS qqq;
CREATE DATABASE qqq;
-- move into the db
\c qqq

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
   id SERIAL PRIMARY KEY,
   title VARCHAR(255),
   body VARCHAR(255),
   user_id INTEGER,
   FOREIGN KEY (user_id) REFERENCES person (id)
);

-- comments table
CREATE TABLE IF NOT EXISTS comment(
   id SERIAL PRIMARY KEY,
   name VARCHAR(255),
   email VARCHAR(255),
   body VARCHAR(255),
   post_id INTEGER,
   FOREIGN KEY (post_id) REFERENCES post (id)
);

-- Changes the owner of the tables to postgres which is the default when installing postgres
ALTER TABLE person
   OWNER to postgres;

ALTER TABLE post
   OWNER to postgres;

ALTER TABLE comment
   OWNER to postgres;