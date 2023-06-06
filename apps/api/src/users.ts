import { z } from 'zod';
import { createHandler, createRouterSchema } from './route-utils';



export const getUserSchema = createRouterSchema({
  request: {
    body: z.object({
      id: z.string(),
    }),
    query: z.object({
      pageId: z.number(),
    }),
    param: z.object({
      name: z.string(),
    }),
  },
  response: z.object({
    name: z.string(),
    id: z.string(),
    pageId: z.number(),
  }),
  path: '/users/:name',
  method: 'post',
});

export const getUserhandler = createHandler<typeof getUserSchema>((req, res) => {
  const name = req.params.name;
  const id = req.body.id;
  const pageId = req.query.pageId;
  res.json({ success: true, message: "ok", data: { name, id, pageId } });
});

// export const getUserhandler = (
//   req: express.Request<
//     GetUserType["request"]["param"],
//     any,
//     GetUserType["request"]["body"],
//     GetUserType["request"]["query"]
//   >,
//   res: express.Response<GetUserType["response"]>
// ) => {
//   const name = req.params.name;
//   const id = req.body.id;
//   const pageId = req.query.pageId;
//   res.json({ message: "ok", name, id, pageId });
// };

//   (req, res) => {
//     const data = userSchema.safeParse(req.body);
//     if (!data.success) {
//       return res.status(400).json({ message: data.error });
//     }
//     // return res.json({message: `user ${data.data.name} created`} as GetUserType['response']);
//     return {
//       message: `user ${data.data.name} created`,
//     } satisfies GetUserType["response"];
//   }
