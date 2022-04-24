import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import usersRouter from "./routes/usersRoutes.js";
import postsRouter from "./routes/postsRoutes.js";
import commentsRouter from "./routes/commentsRoutes.js";
import companiesRouter from "./routes/companiesRoutes.js";

dotenv.config();

const port = process.env.BEPORT || 8080;
const host = process.env.HOST || "localhost";

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.set("json spaces", 2);
app.use(cors(corsOptions));
app.use(express.json());
app.use("/", usersRouter);
app.use("/", postsRouter);
app.use("/", commentsRouter);
app.use("/", companiesRouter);

app.listen(port, host, () => {
  console.log(`Listening on http://${host}:${port}`);
});
