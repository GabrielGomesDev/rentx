import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    userId: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    const authHeader = request.headers.authorization;  
    
    if (!authHeader) {
        throw new AppError("Token missing.", 401);
    }

    const[, token] = authHeader.split(" ");

    try {
    const { userId } = verify(token, "c40c04ae2ab52edd296eb463d0bb9f5a") as IPayload;

    const usersRepository = new UsersRepository();
    const user = usersRepository.findById(userId);

    if (!user) {
        throw new AppError("User does not exist!", 401);
    }

    request.user = {
        id: userId
    };

    next();
    } catch {
        throw new AppError("Invalid token.", 401);
    }
}
export default ensureAuthenticated;