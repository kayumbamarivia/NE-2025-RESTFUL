import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.ts";
import { HistorySubscriber } from "../utils/HistorySubscriber.ts";
import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler.ts';
import { Role } from '../enums/Role.ts';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Fixed JwtAuthenticater middleware - now properly handles return types
export function JwtAuthenticater(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers["authorization"]?.split(" ")[1]; 
  
  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return; // Return after sending response, no value returned from function
  }
  
  try {
    const payload = verifyToken(token);
    HistorySubscriber.setCurrentUserEmail(payload.email);
    req.user = payload;
    
    res.on("finish", () => {
      HistorySubscriber.setCurrentUserEmail("");
    });
    
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
    return; // Return after sending response, no value returned from function
  }
}

// Fixed protect middleware
export const protect = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    next(new AppError('Not authorized to access this route', 401));
    return; // Return after calling next with error
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
    next(new AppError('Not authorized to access this route', 401));
    return; // Return after calling next with error
  }
};

// Role restriction middleware - use AFTER protect middleware
export const restrictTo = (...roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      next(new AppError('You do not have permission to perform this action', 403));
      return; // Return after calling next with error
    }
    next();
  };
};