import { z } from "zod";
import express from "express";

export type RequestSchema = {
  body?: z.ZodTypeAny;
  query?: z.ZodTypeAny;
  param?: z.ZodTypeAny;
};

export type HandlerSchema<
  Request extends RequestSchema,
  Response extends z.ZodTypeAny
> = {
  request: Request;
  response: Response;
};
export function createHandlerSchema<
  Request extends RequestSchema,
  Response extends z.ZodTypeAny
>(object: HandlerSchema<Request, Response>) {
  return object;
}

export type InferOrUndefined<T> = T extends undefined
  ? undefined
  : T extends z.ZodTypeAny
  ? z.infer<T>
  : undefined;

export type InferType<
  HandlerSchema extends { request: RequestSchema; response: z.ZodTypeAny }
> = {
  request: {
    body: InferOrUndefined<HandlerSchema["request"]["body"]>;
    query: InferOrUndefined<HandlerSchema["request"]["query"]>;
    param: InferOrUndefined<HandlerSchema["request"]["param"]>;
  };
  response: z.infer<HandlerSchema["response"]>;
};


export function createHandler<
  Schema extends HandlerSchema<any, any>
>(handler: (
  req: express.Request<InferType<Schema>["request"]["param"], any, InferType<Schema>["request"]["body"], InferType<Schema>["request"]["query"]>,
  res: express.Response<InferType<Schema>["response"]>)
  => void
) {
  return handler;
}