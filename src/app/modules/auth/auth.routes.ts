import { Router } from "express";
import { AuthController } from "./auth.controller";
import auth from "../../middlewares/auth";
import { RoleEnum } from "../../../generated/prisma/enums";



const router = Router();

router.post("/login",
    AuthController.login);

    router.post("/password-change",
        auth(RoleEnum.USER, RoleEnum.ADMIN, RoleEnum.MANAGER),
    AuthController.passwordChange);

export const AuthRoutes: Router = router;