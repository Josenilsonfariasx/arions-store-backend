import { Request, Response } from "express";
import { DetailUserService } from "../../services/user/DetailUserService";

export class DetailUserController {
    async handle(req: Request, res: Response) {
        const userId = req.user_id

        const detailUserService = new DetailUserService();
        const user = await detailUserService.execute({
            userId: userId
        });
        return res.json(user);
    }
}
