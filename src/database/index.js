import cls from "cls-hooked";
import { Sequelize } from "sequelize";
import { registerModels } from "../models/index.js";

export default class Database {
  constructor(environment, dbConfig) {
    this.environment = environment;
    this.dbConfig = dbConfig;
    this.isTestEnvironment = this.environment === "test";
  }

  async connect() {
    const namespace = cls.createNamespace("transactions-namespace");
    Sequelize.useCLS(namespace);
    // connection creating
    const username = "postgres";
    const password = "root";
    const host = "localhost";
    const port = "5432";
    const database = "fakepostsdb";
    const dialect = "postgres";
    this.connection = new Sequelize({
      username,
      password,
      host,
      port,
      database,
      dialect,
      logging: this.isTestEnvironment ? false : console.log,
    });
    // is the connection successful?
    await this.connection.authenticate({ logging: false });

    if (!this.isTestEnvironment) {
      console.log(
        "Connection to the database has been established successfully!"
      );
    }
    // model registration
    registerModels(this.connection);
    // model synchronization
    await this.sync();
  }
  async disconnect() {
    await this.connection.close();
  }
  async sync() {
    await this.connection.sync({
      logging: false,
      force: this.isTestEnvironment,
    });

    if (!this.isTestEnvironment) {
      console.log("Connection synced successfully!");
    }
  }
}
