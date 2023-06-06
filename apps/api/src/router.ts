import express from 'express';
import { getUserhandler, getUserSchema } from './users';
import { InferRouterSchema, registerRouter } from './route-utils';
import validate from './middlewares/validation';

const router = express.Router();

registerRouter<typeof getUserSchema>(router, 'post', '/users/:name', getUserhandler, validate(getUserSchema));

router.get('/', (req: any, res: any) => {
  return res.json({ message: 'hello world' });
});

export type AppRouter = {
  GetUser: InferRouterSchema<typeof getUserSchema>;
};

export default router;
