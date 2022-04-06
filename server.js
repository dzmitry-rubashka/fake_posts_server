import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { users } from "./data/users.js";
import { posts } from "./data/posts.js";
import { comments } from "./data/comments.js";

const port = process.env.PORT || 5000;
const app = express();

dotenv.config();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions));

app.set("json spaces", 2)

app.get("/users", (req, res) => {
  res.status(200).json(users)
})

app.get("/posts", (req, res) => {
  res.status(200).json(posts)
})

app.get("/comments", (req, res) => {
  res.status(200).json(comments)
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})