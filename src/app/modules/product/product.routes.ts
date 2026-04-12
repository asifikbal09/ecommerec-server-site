import { NextFunction, Request, Response, Router } from "express";
import { ProductController } from "./product.controller";
import { fileUploader } from "../../helper/fileUploader";
import { ProductValidation } from "./product.velidation";
import auth from "../../middlewares/auth";
import { RoleEnum } from "../../../generated/prisma/enums";


const router = Router();

router.post(
  "/",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
      
    req.body = ProductValidation.createProductValidationSchema.parse(
      JSON.parse(req.body.data),
    );

    next();
  },
  ProductController.createProduct,
);

router.get("/",auth(RoleEnum.ADMIN,RoleEnum.MANAGER,RoleEnum.USER), ProductController.getAllProducts);

export const ProductRoutes: Router = router;
