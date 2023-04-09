import { DataSource } from "typeorm";

export const myDataSource = new DataSource({
  name: "default",
  type: "postgres",
  host: process.env.MYSQL_HOST,
  port: +(process.env.POSTGRES_PORT as string),
  username: "Kailash",
  password: "Kailash",
  database: process.env.MYSQL_DATABASE,
  entities: ["src/entity/*.ts"],
  logging: true,
  synchronize: true,
});
