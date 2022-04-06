const {users} = require('./data/users.js');
const {posts} = require('./data/posts.js');
const {comments} = require('./data/comments.js');

const express = require("express");

const cors = require('cors')

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
}

const port = 5000;
const app = express();

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

app.listen(port, () => {})