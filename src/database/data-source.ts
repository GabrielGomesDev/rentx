import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "docker",
    password: "ignite",
    database: "rentx",
    synchronize: true,
    logging: true,
    entities: ["./src/modules/**/entities/*.ts"],
    migrations: ["./src/database/migrations/*.ts"],
    subscribers: [],
})

export function createConnection(host = "localhost"): Promise<DataSource> {
    return AppDataSource.setOptions({ host }).initialize();
}

export default AppDataSource;