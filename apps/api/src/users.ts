import { z } from "zod";
import express from "express";

type RequestSchema = {
  body?: z.ZodTypeAny;
  query?: z.ZodTypeAny;
  param?: z.ZodTypeAny;
};

type HandlerSchema<
  Request extends RequestSchema,
  Response extends z.ZodTypeAny
> = {
  request: Request;
  response: Response;
};
function createHandlerSchema<
  Request extends RequestSchema,
  Response extends z.ZodTypeAny
>(object: HandlerSchema<Request, Response>) {
  return object;
}

const getUser = createHandlerSchema({
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
    message: z.string(),
    name: z.string(),
    id: z.string(),
    pageId: z.number(),
  }),
});

type InferOrUndefined<T> = T extends undefined
  ? undefined
  : T extends z.ZodTypeAny
  ? z.infer<T>
  : undefined;

type InferType<
  HandlerSchema extends { request: RequestSchema; response: z.ZodTypeAny }
> = {
  request: {
    body: InferOrUndefined<HandlerSchema["request"]["body"]>;
    query: InferOrUndefined<HandlerSchema["request"]["query"]>;
    param: InferOrUndefined<HandlerSchema["request"]["param"]>;
  };
  response: z.infer<HandlerSchema["response"]>;
};

type GetUserType = InferType<typeof getUser>;

function createHandler<
  Schema extends HandlerSchema<any, any>
>(handler: (
  req: express.Request<InferType<Schema>["request"]["param"], any, InferType<Schema>["request"]["body"], InferType<Schema>["request"]["query"]>,
  res: express.Response<InferType<Schema>["response"]>)
  => void
) {
  return handler;
}

export const getUserhandler = createHandler<typeof getUser>((req, res) => {
  const name = req.params.name;
  // const a = req.params.
  const id = req.body.id;
  const pageId = req.query.pageId;
  res.json({ message: "ok", name, id, pageId });
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