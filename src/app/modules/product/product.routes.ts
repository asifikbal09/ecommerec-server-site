import { NextFunction, Request, Response, Router } from "express";
import { ProductController } from "./product.controller";
import { fileUploader } from "../../helper/fileUploader";
import { ProductValidation } from "./product.velidation";


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

export const ProductRoutes: Router = router;
