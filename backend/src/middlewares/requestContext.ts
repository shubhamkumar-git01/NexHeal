import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

/**
 * Middleware to attach unique identifiers to each request for observability.
 */
export const requestContext = (req: Request, res: Response, next: NextFunction) => {
  req.headers['x-request-id'] = req.headers['x-request-id'] || uuidv4();
  req.headers['x-correlation-id'] = req.headers['x-correlation-id'] || uuidv4();
  req.headers['x-trace-id'] = req.headers['x-trace-id'] || uuidv4();
  next();
};
