import { Router } from "express";
import type { Router as ExpressRouter } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { CategoryRoutes } from "../modules/category/category.routes";
import { ProductRoutes } from "../modules/product/product.routes";



const router: ExpressRouter = Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes
    },
    {
        path: '/auth',
        route: AuthRoutes
    },
    {
        path: '/categories',
        route: CategoryRoutes
    },
    {
        path: '/products',
        route: ProductRoutes
    },
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;