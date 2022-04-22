-- -- old version
-- DROP DATABASE IF EXISTS fakepostsdb;
-- CREATE DATABASE fakepostsdb;
-- -- move into the db
-- \c fakepostsdb
--
-- -- users table
-- CREATE TABLE IF NOT EXISTS person(
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(255),
--     username VARCHAR(255),
--     email VARCHAR(255),
--     address JSON,
--     phone VARCHAR(255),
--     website VARCHAR(255),
--     company JSON
-- );
-- -- posts table
-- CREATE TABLE IF NOT EXISTS post(
--     userid INTEGER,
--     id SERIAL PRIMARY KEY,
--     title VARCHAR(255),
--     body VARCHAR(255),
--     FOREIGN KEY (userid) REFERENCES person (id) ON DELETE CASCADE
-- );
-- -- comments table
-- CREATE TABLE IF NOT EXISTS comment(
--     postid INTEGER,
--     userid INTEGER,
--     id SERIAL PRIMARY KEY,
--     name TEXT,
--     email TEXT,
--     body TEXT,
--     FOREIGN KEY (postid) REFERENCES post (id) ON DELETE CASCADE,
--     FOREIGN KEY (userid) REFERENCES person (id) ON DELETE CASCADE
-- );
-- new version
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
    website VARCHAR(255)
);

-- company table
CREATE TABLE IF NOT EXISTS company(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    catchphrase VARCHAR(255),
    bs VARCHAR(255)
);

-- company-person table
CREATE TABLE IF NOT EXISTS company_person(
    userid INTEGER REFERENCES person (id) ON UPDATE CASCADE ON DELETE CASCADE,
    companyid INTEGER REFERENCES company (id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT company_person_key PRIMARY KEY (userid, companyid)
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
