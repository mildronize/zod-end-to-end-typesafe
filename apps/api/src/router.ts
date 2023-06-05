import express from 'express';
import { GetUserType, getUserhandler, getUser } from './users';
import { registerRouter } from './route-utils';

const router = express.Router();

registerRouter<typeof getUser>(router, 'post', '/users/:name', getUserhandler);

router.get("/", (req, res) => {
  return res.json({ message: "hello world" });
})
// .use(errorResponder)
router.get("/message/:name", (req, res) => {
  return res.json({ message: `hello ${req.params.name}` });
})

router.get("/healthz", (req, res) => {
  return res.json({ ok: true });
});


export default router;