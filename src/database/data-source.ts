import { DataSource } from "typeorm"
import { Category } from "../modules/cars/entities/Category";
import { CreateCategories1654087906109 } from "./migrations/1654087906109-CreateCategories";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "docker",
    password: "ignite",
    database: "rentx",
    synchronize: false,
    logging: true,
    entities: [Category],
    migrations: [CreateCategories1654087906109],
    subscribers: [],
})

export function createConnection(host = "database"): Promise<DataSource> {
    return AppDataSource.setOptions({ host }).initialize();
}