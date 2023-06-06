import { Request, Response, NextFunction } from 'express';
import { AnyRouterSchema, createBaseResponseSchema } from '../route-utils';
import { z } from 'zod';

type BaseResponse = z.infer<ReturnType<typeof createBaseResponseSchema>>;

const validate = (routerSchema: AnyRouterSchema) => (req: Request, res: Response<BaseResponse>, next: NextFunction) => {
  let message: string | undefined;
  try {
    message = 'Body Validation error';
    routerSchema.request.body?.parse(req.body);
    message = 'Query Validation error';
    routerSchema.request.query?.parse(req.query);
    message = 'Param Validation error';
    routerSchema.request.param?.parse(req.params);
    next();
  } catch (e: unknown) {
    if (e instanceof z.ZodError) {
      return res.status(400).send({
        success: false,
        message: message || 'Validation error',
        data: e.errors,
      });
    }
  }
};

export default validate;
