// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
//
// import usersRoutes from "./routes/usersRoutes.js";
// import postsRoutes from "./routes/postsRoutes.js";
// import commentsRoutes from "./routes/commentsRoutes.js";
// import companiesRoutes from "./routes/companiesRoutes.js";
// import companyPersonRoutes from "./routes/companyPersonRoutes.js";
//
// dotenv.config();
//
// const port = process.env.BE_PORT || 8080;
// const host = process.env.DB_HOST || "localhost";
//
// const app = express();
// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true,
//   optionsSuccessStatus: 200,
// };
// app.set("json spaces", 2);
// app.use(cors(corsOptions));
// app.use(express.json());
// app.use("/", usersRoutes);
// app.use("/", postsRoutes);
// app.use("/", commentsRoutes);
// app.use("/", companiesRoutes);
// app.use("/", companyPersonRoutes);
//
//
// app.listen(port, host, () => {
//   console.log(`Listening on http://${host}:${port}`);
// });
