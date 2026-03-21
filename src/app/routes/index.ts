import { Router } from "express";
import type { Router as ExpressRouter } from "express";
import { UserRoutes } from "../modules/user/user.route";



const router: ExpressRouter = Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;