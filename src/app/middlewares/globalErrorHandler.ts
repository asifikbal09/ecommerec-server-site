import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status"
import { Prisma } from "../../generated/prisma/client";
import { prismaErrorsCodes } from "../error/prismaClientKnownRequestErrorCode";
import config from "../../config";
import ApiError from "../error/ApiError";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
    let success = false;
    let message = err.message || "Something went wrong!";
    let error = err;
    let stack = config.node_env === "development" ? err.stack : null;

    if(err instanceof Prisma.PrismaClientKnownRequestError){
        prismaErrorsCodes.forEach((prismaError)=>{
            if(error.code === prismaError.code){
                statusCode = httpStatus.BAD_REQUEST;
                message = prismaError.message;
            }
        })
    }
    else if(err instanceof Prisma.PrismaClientValidationError){
        statusCode = httpStatus.BAD_REQUEST;
        message = "Invalid query or data provided to Prisma Client. Please check your query and data for correctness.";
        
    }
    else if(err instanceof Prisma.PrismaClientUnknownRequestError){
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = "An unknown error occurred while communicating with the database.";
    }
    else if(err instanceof Prisma.PrismaClientRustPanicError){
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = "Prisma Client panicked due to a Rust error. Please check the server logs for more details.";
    }
    else if(err instanceof Prisma.PrismaClientInitializationError){
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = "Failed to initialize Prisma Client. Please check your database connection and configuration.";
    }
    else if(err instanceof ApiError){
        statusCode = err.statusCode;
        message = err.message;
        error = err.cause;
        stack = err.stack;
    }
    else if(err instanceof Error){
        message = err.message;
    }

    res.status(statusCode).json({
        success,
        message,
        error,
        stack
    })
};

export default globalErrorHandler;