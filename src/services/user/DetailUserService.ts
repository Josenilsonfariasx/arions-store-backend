import { prismaClient } from "../../prisma/index";
interface UserRequest {
    userId: string;
}
export class DetailUserService {
    async execute({ userId }: UserRequest) {
        const user = prismaClient.user.findFirst({
            where: {
                id: userId,
            },
            select: {
                id: true,
                name: true,
                email: true,
                addresses: true,
                photo: true,
            },
        });
        if (user) {
            return user;
        }
        throw new Error("User is not registered!");
    }
}
