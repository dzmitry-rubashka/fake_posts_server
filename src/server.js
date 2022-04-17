import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pkg from "pg";

const port = 8080;
const app = express();

dotenv.config();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.set("json spaces", 2);

const { Pool } = pkg;
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "example",
  password: "root",
  port: 5432,
});

pool.query("SELECT * FROM person", (error, results) => {
  app.get("/users", (req, res) => {
    res.status(200).json(results.rows);
  });
  if (error) {
    throw error;
  }
});

pool.query("SELECT * FROM post", (error, results) => {
  app.get("/posts", (req, res) => {
    res.status(200).json(results.rows);
  });
  if (error) {
    throw error;
  }
});

pool.query("SELECT * FROM comment", (error, results) => {
  app.get("/comments", (req, res) => {
    res.status(200).json(results.rows);
  });
  if (error) {
    throw error;
  }
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
