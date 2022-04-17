import fs from "fs";
import pkg from "pg";
import fastcsv from "fast-csv";
import { getTableStructure } from "./utils/getTableStructure.js";

const { Pool } = pkg;

const usersStream = fs.createReadStream("./base-data/users.csv");
let usersData = [];
const csvUsersStream = fastcsv
  .parse({ delimiter: ";" })
  .on("data", function (data) {
    usersData.push(data);
  })
  .on("end", function () {
    // create a new connection to the database
    const pool = new Pool({
      host: "localhost",
      user: "postgres",
      database: "qqq",
      password: "root",
      port: 5432,
    });
    const query = getTableStructure(usersData[0], "person");
    usersData.shift();
    pool.connect((err, client, done) => {
      if (err) throw err;
      try {
        usersData.forEach((row) => {
          client.query(query, row, (err, res) => {
            if (err) {
              console.log(err.stack);
            } else {
              console.log("inserted " + res.rowCount + " row:", row);
            }
          });
        });
      } finally {
        done();
        pool.query("SELECT * FROM person", (error, results) => {
          if (error) {
            throw error;
          }
        });
      }
    });
  });
usersStream.pipe(csvUsersStream);

const postsStream = fs.createReadStream("./base-data/posts.csv");
let postsData = [];
const csvPostsStream = fastcsv
  .parse({ delimiter: ";" })
  .on("data", function (data) {
    console.log(data, 1111);
    postsData.push(data);
  })
  .on("end", function () {
    // create a new connection to the database
    const pool = new Pool({
      host: "localhost",
      user: "postgres",
      database: "qqq",
      password: "root",
      port: 5432,
    });
    const query = getTableStructure(postsData[0], "post");
    postsData.shift();
    pool.connect((err, client, done) => {
      if (err) throw err;
      try {
        postsData.forEach((row) => {
          client.query(query, row, (err, res) => {
            if (err) {
              console.log(err.stack);
            } else {
              console.log("inserted " + res.rowCount + " row:", row);
            }
          });
        });
      } finally {
        done();
        pool.query("SELECT * FROM post", (error, results) => {
          if (error) {
            throw error;
          }
        });
      }
    });
  });
postsStream.pipe(csvPostsStream);

const commentsStream = fs.createReadStream("./base-data/comments.csv");
let commentsData = [];
const csvCommentsStream = fastcsv
  .parse({ delimiter: ";" })
  .on("data", function (data) {
    commentsData.push(data);
  })
  .on("end", function () {
    // create a new connection to the database
    const pool = new Pool({
      host: "localhost",
      user: "postgres",
      database: "qqq",
      password: "root",
      port: 5432,
    });
    const query = getTableStructure(commentsData[0], "comment");
    commentsData.shift();
    pool.connect((err, client, done) => {
      if (err) throw err;
      try {
        commentsData.forEach((row) => {
          client.query(query, row, (err, res) => {
            if (err) {
              console.log(err.stack);
            } else {
              console.log("inserted " + res.rowCount + " row:", row);
            }
          });
        });
      } finally {
        done();
        pool.query("SELECT * FROM comment", (error, results) => {
          if (error) {
            throw error;
          }
        });
      }
    });
  });
commentsStream.pipe(csvCommentsStream);