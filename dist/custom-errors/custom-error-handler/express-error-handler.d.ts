import { CustomError } from '../custom-error-types/index.js';
import { Request, Response, NextFunction } from 'express';
export declare function errorHandler(error: CustomError, request: Request, response: Response, next: NextFunction): void;
