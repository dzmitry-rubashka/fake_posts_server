import fs from "fs";
import pkg from "pg";
import fastcsv from "fast-csv";
import { getTableStructure } from "./utils/getTableStructure.js";

const { Pool } = pkg;
const poolCreator = {
  host: "localhost",
  user: "postgres",
  database: "fakepostsdb",
  password: "root",
  port: 5432,
};

const usersStream = fs.createReadStream("./src/base-data/users.csv");
let usersData = [];
const csvUsersStream = fastcsv
  .parse({ delimiter: ";" })
  .on("data", function (data) {
    usersData.push(data);
  })
  .on("end", function () {
    const pool = new Pool(poolCreator); // create a new connection to the database
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
              // console.log("inserted " + res.rowCount + " row:", row);
            }
          });
        });
      } finally {
        done();
      }
    });
  });
usersStream.pipe(csvUsersStream);

const postsStream = fs.createReadStream("./src/base-data/posts.csv");
let postsData = [];
const csvPostsStream = fastcsv
  .parse({ delimiter: ";" })
  .on("data", function (data) {
    postsData.push(data);
  })
  .on("end", function () {
    const pool = new Pool(poolCreator); // create a new connection to the database
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
              // console.log("inserted " + res.rowCount + " row:", row);
            }
          });
        });
      } finally {
        done();
      }
    });
  });
postsStream.pipe(csvPostsStream);

const commentsStream = fs.createReadStream("./src/base-data/comments.csv");
let commentsData = [];
const csvCommentsStream = fastcsv
  .parse({ delimiter: ";" })
  .on("data", function (data) {
    commentsData.push(data);
  })
  .on("end", function () {
    const pool = new Pool(poolCreator); // create a new connection to the database
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
              // console.log("inserted " + res.rowCount + " row:", row);
            }
          });
        });
      } finally {
        done();
      }
    });
  });
commentsStream.pipe(csvCommentsStream);
