import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { DataSource } from "typeorm"
import { CreateCategories1654087906109 } from "./migrations/1654087906109-CreateCategories";
import { CreateSpecifications1657335107183 } from "./migrations/1657335107183-CreateSpecifications";
import { CreateUsers1657393687003 } from "./migrations/1657393687003-CreateUsers";
import { AlterUsersRemoveUsername1657477926642 } from "./migrations/1657477926642-AlterUsersRemoveUsername";
import { AlterUserAddAvatar1657658202990 } from "./migrations/1657658202990-AlterUserAddAvatar";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "docker",
    password: "ignite",
    database: "rentx",
    synchronize: false,
    logging: true,
    entities: [Category, Specification, User],
    migrations: [
        CreateCategories1654087906109,
        CreateSpecifications1657335107183,
        CreateUsers1657393687003,
        AlterUsersRemoveUsername1657477926642,
        AlterUserAddAvatar1657658202990
    ],
    subscribers: [],
})

export function createConnection(host = "database"): Promise<DataSource> {
    return AppDataSource.setOptions({ host }).initialize();
}