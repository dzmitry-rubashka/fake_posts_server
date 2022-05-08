export const poolConfig = {
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_DATABASE || "fakepostsdb",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
};
