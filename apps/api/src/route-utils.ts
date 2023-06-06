import { z } from 'zod';
import express from 'express';

type Method = 'get' | 'post' | 'put' | 'delete';

export type RequestSchema = {
  body?: z.ZodTypeAny;
  query?: z.ZodTypeAny;
  param?: z.ZodTypeAny;
};

export type RouterSchema<
  TRequest extends RequestSchema,
  TResponse extends z.ZodTypeAny,
  TPath extends string,
  TMethod extends Method
> = {
  method: TMethod;
  path: TPath;
  request: TRequest;
  response: TResponse;
};

export type AnyRouterSchema = RouterSchema<any, any, any, any>;

export function createBaseResponseSchema<TSchema extends z.ZodTypeAny>(data: TSchema){
  return z.object({
    success: z.boolean(),
    message: z.string(),
    data
  });
}

export function createRouterSchema<
  TRequest extends RequestSchema,
  TResponse extends z.ZodTypeAny,
  TPath extends string,
  TMethod extends Method
>(object: { method: TMethod; path: TPath; request: TRequest; response: TResponse }) {
  return {
    ...object,
    response: createBaseResponseSchema(object.response),
  };
}

export type SafeZodInfer<T> = T extends z.ZodTypeAny ? z.infer<T> : undefined;

export type InferRouterSchema<TSchema extends AnyRouterSchema> = {
  method: TSchema['method'];
  path: TSchema['path'];
  request: {
    body: SafeZodInfer<TSchema['request']['body']>;
    query: SafeZodInfer<TSchema['request']['query']>;
    param: SafeZodInfer<TSchema['request']['param']>;
  };
  response: z.infer<TSchema['response']>;
};

export type AnyRouter = {
  path: string;
  method: string;
  request: {
    body?: Record<string, any>;
    query?: Record<string, any>;
    param?: Record<string, any>;
  };
  response: unknown;
};

type Handler<TSchema extends AnyRouterSchema> = (
  req: express.Request<
    InferRouterSchema<TSchema>['request']['param'],
    any,
    InferRouterSchema<TSchema>['request']['body'],
    InferRouterSchema<TSchema>['request']['query']
  >,
  res: express.Response<InferRouterSchema<TSchema>['response']>
) => void;

export function createHandler<TSchema extends AnyRouterSchema>(handler: Handler<TSchema>) {
  return handler;
}

export function registerRouter<TSchema extends AnyRouterSchema>(
  router: express.Router,
  method: TSchema['method'],
  path: TSchema['path'],
  handler: Handler<TSchema>
) {
  switch (method) {
    case 'get':
      router.get(path, handler);
      break;
    case 'post':
      router.post(path, handler);
      break;
    case 'put':
      router.put(path, handler);
      break;
    case 'delete':
      router.delete(path, handler);
      break;
    default:
      throw new Error('method not supported');
  }
}
