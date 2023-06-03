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

export type SafeZodInfer<T> = T extends z.ZodTypeAny
  ? z.infer<T>
  : undefined;

export type InferHandlerSchema<
  TSchema extends HandlerSchema<any, any>
> = {
  request: {
    body: SafeZodInfer<TSchema["request"]["body"]>;
    query: SafeZodInfer<TSchema["request"]["query"]>;
    param: SafeZodInfer<TSchema["request"]["param"]>;
  };
  response: z.infer<TSchema["response"]>;
};


export function createHandler<
  TSchema extends HandlerSchema<any, any>
>(handler: (
  req: express.Request<InferHandlerSchema<TSchema>["request"]["param"], any, InferHandlerSchema<TSchema>["request"]["body"], InferHandlerSchema<TSchema>["request"]["query"]>,
  res: express.Response<InferHandlerSchema<TSchema>["response"]>)
  => void
) {
  return handler;
}