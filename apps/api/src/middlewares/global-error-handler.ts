import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { createBaseResponseSchema } from '../route-utils';
import { HttpError } from '../errors/http-error';

type BaseResponse = z.infer<ReturnType<typeof createBaseResponseSchema>>;

export function globalErrorHanlder(error: unknown, request: Request, response: Response<BaseResponse>, next: NextFunction) {
  let statusCode = 500;
  let message = '';

  if(error instanceof HttpError) {
    statusCode = error.statusCode;
  }

  if(error instanceof Error) {
    console.log(`${error.name}: ${error.message}`);
    message = error.message;
  }

  response.status(statusCode).send({
    message,
    success: false,
    data: null,
  });
}