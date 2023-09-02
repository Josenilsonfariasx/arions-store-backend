import { Router, Request, Response } from "express";

// users - import
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

// middlewares - import

import { IsAuthenticated } from "./middlewares/IsAuthenticated";

export const router = Router();
// ---Rotas---

// ---user---
router.post("/users", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
router.get("/me", IsAuthenticated, new DetailUserController().handle);
