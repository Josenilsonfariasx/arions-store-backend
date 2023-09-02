import { prismaClient } from "../../prisma/index";
import { hash } from "bcryptjs";
interface userRequest {
    name: string;
    email: string;
    password: string;
}

export class CreateUserService {
    async execute({ name, email, password }: userRequest) {
        let obj = {};
        if (!email) {
            throw new Error("Fill in the email field");
        }
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email,
            },
        });
        if (userAlreadyExists) {
            throw new Error("User already exists");
        }

        const passwordHash = await hash(password, 8);
        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: false,
            },
        });

        return user;
    }
}
