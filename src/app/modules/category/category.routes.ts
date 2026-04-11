import { Router } from "express";
import { CategoryController } from "./category.controller";




const router = Router();

router.post("/",CategoryController.createCategory);
router.get("/",CategoryController.getAllCategories);
router.get("/:categoryId/products",CategoryController.getCategoryWiseProducts);



export const CategoryRoutes: Router = router;