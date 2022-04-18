import express from "express";
import usersRouter from "./router/users.routes.js";
import postsRouter from "./router/posts.routes.js";
import commentsRouter from "./router/comments.routes.js";
import dotenv from "dotenv";
import cors from "cors";

const port = 8080;
const host = "localhost";
const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};
dotenv.config();

app.set("json spaces", 2);
app.use(cors(corsOptions));
app.use(express.json());
app.use("/", usersRouter);
app.use("/", postsRouter);
app.use("/", commentsRouter);

app.listen(port, host, () => {
  console.log(`Listening on http://${host}:${port}`);
});
