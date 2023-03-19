import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: ["dist/**/*.entity{.ts,.js}"],
  subscribers: [],
  migrations: [],
});
