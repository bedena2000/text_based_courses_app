import { Sequelize } from "sequelize";
import { DB_CONFIG } from "./env";

const isProduction = process.env.NODE_ENV === "production";

if (isProduction && !process.env.DATABASE_URL) {
  throw new Error("❌ DATABASE_URL is missing in production");
}

export const sequelize = isProduction
  ? new Sequelize(process.env.DATABASE_URL as string, {
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
      pool: {
        max: 5,
        min: 0,
        acquire: 30_000,
        idle: 10_000,
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
