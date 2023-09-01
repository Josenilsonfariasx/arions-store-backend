import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";

export const router = Router();
// ---Rotas---

// ---user---
router.post("/users", new CreateUserController().handle);
