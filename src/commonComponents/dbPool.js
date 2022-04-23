export const pool = {
  user: process.env.USER || "postgres",
  password: process.env.PASSWORD || "root",
  database: process.env.DATABASE || "fakepostsdb2",
  host: process.env.HOST || "localhost",
  port: process.env.DBPORT || 5432,
};
