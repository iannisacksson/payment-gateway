import { Sequelize } from "sequelize-typescript";
import path from "node:path";

export class Database {
  private static instance: Sequelize;

  private constructor() {}

  public static getInstance(): Sequelize {
    if (!Database.instance) {
      Database.instance = new Sequelize({
        database: "payment-gateway",
        username: "postgres",
        password: "postgres",
        host: "localhost",
        dialect: "postgres",
        port: 5433,
        models: [path.join(__dirname, "/../models")], // Adjust the path to your models
      });
    }
    Database.instance
      .authenticate()
      .then(() => {
        console.log("Database connection established successfully.");
      })
      .catch((error) => {
        console.error("Unable to connect to the database:", error);
      });
    return Database.instance;
  }
}

