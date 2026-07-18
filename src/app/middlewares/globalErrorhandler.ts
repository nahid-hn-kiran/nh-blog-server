import { NextFunction, Request, Response } from "express";
import { Prisma } from "../../../generated/prisma/client";


const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500;
    let errorMessage = "Internal server error!";
    let errorDetails = err;
    
    if(err instanceof Prisma.PrismaClientValidationError) {
        statusCode = 400;
        errorMessage = "Incorrect field type or missing field!";
    } else if(err instanceof Prisma.PrismaClientKnownRequestError) {
        if(err.code === "P2025") {
            statusCode = 400;
            errorMessage = "An operation failed because It depends on one or more records that were required."
        } else if(err.code === "P2002") {
            statusCode = 400;
            errorMessage = "Duplicate key error"
        } else if(err.code === "P2003") {
            statusCode = 400;
            errorMessage = "Foreign key constraint failed!"
        }
    } else if(err instanceof Prisma.PrismaClientUnknownRequestError) {
        statusCode = 500;
        errorMessage = "An error occured during qurey execution"
    } else if(err instanceof Prisma.PrismaClientInitializationError) {
        statusCode = 400;
        errorMessage = "Something went wrong"
    }
    res.status(statusCode);
    res.json({
        message: errorMessage,
        error: errorDetails
    })
}

export default globalErrorHandler;