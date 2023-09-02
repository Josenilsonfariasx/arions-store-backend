import { prismaClient } from "../../prisma/index";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
interface AuthRequest {
    email: string;
    password: string;
}

export class AuthUserService {
    async execute({ email, password }: AuthRequest) {
        // Verification user

        const userExists = await prismaClient.user.findFirst({
            where: {
                email: email,
            },
        });

        if (!userExists) {
            throw new Error("User/Password incorrect!");
        }

        const passwordMatch = await compare(password, userExists.password);
        if (!passwordMatch) {
            throw new Error("User/Password incorrect!");
        }

        // JWT

        const token = sign(
            {
                name: userExists.name,
                email: userExists,
            },
            process.env.JWT_SECRET,
            {
                subject: userExists.id,
                expiresIn: "30d",
            }
        );
        return {
            id : userExists.id,
            name: userExists.name,
            email: userExists.email,
            photo: userExists.photo,
            acessToken: token
        }
    }
}
