import { CustomError } from '../custom-error-types';
import { Request, Response, NextFunction } from 'express';
export declare function errorHandler(error: CustomError, request: Request, response: Response, next: NextFunction): void;
