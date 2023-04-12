import { DataSource } from "typeorm";

export const myDataSource = new DataSource({
  name: "default",
  type: "postgres",
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT as string),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ["src/entity/*.ts"],
  logging: true,
  synchronize: true,
});
