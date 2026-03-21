import { Router } from "express";
import type { Router as ExpressRouter, NextFunction, Request, Response } from "express";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";
import { fileUploader } from "../../helper/fileUploader";

const router = Router();

router.post(
  "/create-user",
fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createUserValidationSchema.parse(
      JSON.parse(req.body.data),
    );

    next();
  },

  UserController.createUser,
);

router.post(
  "/create-admin",
fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createAdminValidationSchema.parse(
      JSON.parse(req.body.data),
    );

    next();
  },

  UserController.createAdmin,
);
router.post(
  "/create-manager",
fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {

    req.body = UserValidation.createManagerValidationSchema.parse(
      JSON.parse(req.body.data),
    );

    next();
  },

  UserController.createManager,
);

export const UserRoutes:ExpressRouter = router;