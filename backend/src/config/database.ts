import { Sequelize } from "sequelize";
import { DB_CONFIG } from "./env";

export const sequelize = new Sequelize(
  DB_CONFIG.name,
  DB_CONFIG.user,
  DB_CONFIG.password,
  {
    host: DB_CONFIG.host,
    port: Number(DB_CONFIG.port),
    dialect: "postgres",
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
    },
  }
);
