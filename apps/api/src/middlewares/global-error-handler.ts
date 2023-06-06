import { Request, Response, NextFunction } from 'express';

export function globalErrorHanlder(error: Error, request: Request, response: Response, next: NextFunction) {
  console.log(`error ${error.message}`);
  next(error); // calling next middleware
}
