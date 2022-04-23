import fs from "fs";
import pkg from "pg";
import fastcsv from "fast-csv";

import { getTableStructure } from "./commonComponents/utils/getTableStructure.js";
import { pool } from "./commonComponents/dbPool.js";

const { Pool } = pkg;
const poolCreator = pool;

await new Promise((resolve) => {
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
          resolve();
          done();
        }
      });
    });
  usersStream.pipe(csvUsersStream);
});

await new Promise((resolve) => {
  const companiesStream = fs.createReadStream("./src/base-data/companies.csv");
  let companiesData = [];
  const csvCompaniesStream = fastcsv
    .parse({ delimiter: ";" })
    .on("data", function (data) {
      companiesData.push(data);
    })
    .on("end", function () {
      const pool = new Pool(poolCreator); // create a new connection to the database
      const query = getTableStructure(companiesData[0], "company");
      companiesData.shift();
      pool.connect((err, client, done) => {
        if (err) throw err;
        try {
          companiesData.forEach((company) => {
            const [users_ids, ...companyProps] = company;
            client.query(query, companyProps, (err, company) => {
              if (err) {
                console.log(err.stack, 12);
              } else {
                // console.log("inserted " + res.rowCount + " row:", row);
                const userIdsArray = users_ids.split(",");
                userIdsArray.forEach(
                  (user_id = companyProps[companyProps.length - 1]) => {
                    `INSERT INTO company_person (company_id, user_id) values ($1, $2) RETURNING *`,
                      [company.id, user_id];
                  }
                );
              }
            });
          });
        } finally {
          done();
          resolve();
        }
      });
    });
  companiesStream.pipe(csvCompaniesStream);
});

await new Promise((resolve) => {
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
          resolve();
          done();
        }
      });
    });
  postsStream.pipe(csvPostsStream);
});

await new Promise((resolve) => {
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
          resolve();
        }
      });
    });
  commentsStream.pipe(csvCommentsStream);
});
