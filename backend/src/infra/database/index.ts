import { Sequelize } from "sequelize-typescript";

export class Database {
  private readonly sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize({
      database: "payment-gateway",
      username: "postgres",
      password: "postgres",
      host: "localhost",
      dialect: "postgres",
      port: 5433,
      models: [__dirname + "/../models"], // Adjust the path to your models
    });
  }

  async connect() {
    try {
      await this.sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
}
