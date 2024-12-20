import { NextFunction, Request, Response } from "express";
import { HttpException } from "../execptions/root";

export const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction): void => {
   
    res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode,
        errors: error.errors
    })

    console.log("error middleware")
}