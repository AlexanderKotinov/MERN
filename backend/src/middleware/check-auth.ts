import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import HttpError from '../models/http-error';

interface AuthenticatedRequest extends Request {
  userData?: { agentId: string; email: string };
}

export const checkAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error('Authentication failed!');
    }

    const token = authHeader.split(' ')[1];
    console.log(token);

    if (!token) {
      throw new Error('Authentication failed!');
    }

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { agentId: string; email: string };

    req.userData = { agentId: decodedToken.agentId, email: decodedToken.email };
    next();
  } catch (err) {
    return next(new HttpError('Authentication failed!', 403));
  }
};