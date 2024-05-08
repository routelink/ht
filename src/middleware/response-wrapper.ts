import { classToPlain } from 'class-transformer';
import { Response, NextFunction } from 'express';

export function serializationMiddleware(req: any, res: Response, next: NextFunction) {
  const originalJson = res.json;

  res.json = function (body) {
    const group = req.serializationGroup || 'default';
    const serializedBody = classToPlain(body, { groups: [group] });
    console.log(body);
    return originalJson.call(res, serializedBody);
  };

  next();
}