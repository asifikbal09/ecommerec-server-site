import { Router } from "express";
import type { Router as ExpressRouter } from "express";



const router: ExpressRouter = Router();

const moduleRoutes = [
    {
        path: '/',
        route: router
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;