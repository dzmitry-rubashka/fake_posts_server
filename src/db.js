import fs from "fs";
import pkg from "pg";
import fastcsv from "fast-csv";

import { columnNames } from "./commonComponents/utils/columnNames.js";
import { poolConfig } from "./commonComponents/poolConfig.js";

const { Pool } = pkg;

await new Promise((resolve) => {
  const usersStream = fs.createReadStream("./src/base-data/users.csv");
  let usersData = [];
  const csvUsersStream = fastcsv
    .parse({ delimiter: ";" })
    .on("data", function (data) {
      usersData.push(data);
    })
    .on("end", function () {
      const pool = new Pool(poolConfig); // create a new connection to the database
      const query = columnNames(usersData[0], "person");
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
      const pool = new Pool(poolConfig); // create a new connection to the database
      const [users_ids, ...companyColumns] = companiesData[0];
      const query = columnNames(companyColumns, "company");
      companiesData.shift();
      pool.connect((err, client, done) => {
        if (err) throw err;
        try {
          companiesData.forEach((company) => {
            const [users_ids, ...companyProps] = company;
            client.query(query, companyProps, (err, res) => {
              if (err) {
                console.log(err.stack);
              } else {
                // console.log("inserted " + res.rowCount + " row:", row)
                const userIdsArray = users_ids.split(",");
                userIdsArray.forEach((user_id) => {
                  client.query(
                    `INSERT INTO company_person (user_id, company_id) values ($1, $2) RETURNING *`,
                    [user_id, res.rows[0].id]
                  );
                });
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
      const pool = new Pool(poolConfig); // create a new connection to the database
      const query = columnNames(postsData[0], "post");
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
      const pool = new Pool(poolConfig); // create a new connection to the database
      const query = columnNames(commentsData[0], "comment");
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
