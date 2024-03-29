import fs from "fs";
import { parse } from "csv-parse";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";

interface IImportCategory {
    name: string;
    description: string;
}

@injectable()
class ImportCategoryUseCase {

    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) { }

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const categories: IImportCategory[] = [];
            const stream = fs.createReadStream(file.path);
            const parseFile = parse();

            stream.pipe(parseFile);

            parseFile.on('data', async (line) => {
                const [name, description] = line;
                categories.push({
                    name,
                    description
                });
            })
                .on("end", () => {
                    fs.promises.unlink(file.path);
                    resolve(categories);
                })
                .on("error", (err) => {
                    reject(err);
                })
        });
    }

    async execute(file: Express.Multer.File): Promise<void> {
        console.log(file);
        const categories = await this.loadCategories(file);
        categories.map(async (category) => {
            const { name, description } = category;
            const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

            if (!categoryAlreadyExists) {
                await this.categoriesRepository.create({
                    name,
                    description
                });
            }
        });
    }
}

export { ImportCategoryUseCase };