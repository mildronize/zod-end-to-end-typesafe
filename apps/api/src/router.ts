import express from 'express';
import { getUserhandler, getUserSchema } from './users';
import { InferRouterSchema, registerRouter } from './route-utils';

const router = express.Router();

registerRouter<typeof getUserSchema>(router, 'post', '/users/:name', getUserhandler);

router.get("/", (req, res) => {
  return res.json({ message: "hello world" });
});

export type AppRouter = {
  GetUser: InferRouterSchema<typeof getUserSchema>;
}


export default router;