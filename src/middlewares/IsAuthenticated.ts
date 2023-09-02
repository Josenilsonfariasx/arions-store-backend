import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { prismaClient } from "../prisma/index";
interface Payload {
    sub: string;
}

export const IsAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization;
    token ? console.log("foi") : res.status(401).end();
    const [, authToken] = token.split(" ");

    try {
        const { sub } = verify(authToken, process.env.JWT_SECRET) as Payload;
        // get token id to use for all routes
        req.user_id = sub;
        next();
    } catch (error) {
        res.status(401).end();
    }
};
