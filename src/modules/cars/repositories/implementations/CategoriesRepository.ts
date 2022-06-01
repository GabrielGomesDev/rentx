/**
** Exemplo de Singleton
** Instanciado via método getInstance() para evitar que o repositório seja reiniciado quando instanciado.
**/

import { Repository } from "typeorm";
import AppDataSource from "../../../../database/data-source";
import { Category } from "../../entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;
    private static INSTANCE: CategoriesRepository;

    constructor() {
        this.repository = AppDataSource.getRepository(Category);
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = this.repository.create({
            description,
            name
        });

        await this.repository.save(category);
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOneBy({ name });
        return category;
    }
}

export { CategoriesRepository };