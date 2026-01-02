import { Sequelize } from "sequelize";
import { DB_CONFIG } from "./env";

const isProduction = process.env.NODE_ENV === "production";

export const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      logging: false,
      define: {
        timestamps: true,
        underscored: true,
      },
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    })
  : new Sequelize(DB_CONFIG.name, DB_CONFIG.user, DB_CONFIG.password, {
      host: DB_CONFIG.host,
      port: Number(DB_CONFIG.port),
      dialect: "postgres",
      logging: false,
      define: {
        timestamps: true,
        underscored: true,
      },
    });
