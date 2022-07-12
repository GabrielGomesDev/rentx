import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { hash } from "bcryptjs";
import { AppError } from "../../../../errors/AppError";

@injectable()
class CreateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ){}

    async execute({name, password, email, driver_license}: ICreateUserDTO): Promise<void> {

        const userAlreadyExists = this.userRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new AppError("User already exists", 400);
        }

        const passwordHash = await hash(password, 8);

        await this.userRepository.create({
            name,
            password: passwordHash,
            email,
            driver_license
        });
    }
}

export { CreateUserUseCase };