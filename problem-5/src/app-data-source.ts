import { DataSource } from "typeorm"

export const MyDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  entities: ["src/entities/*.ts"],
  migrations: [ "src/migrations/*.ts"], 
  logging: true,
  synchronize: false,
})
