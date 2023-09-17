import { Request,Response ,NextFunction } from "express";
import { CustomError } from "../errors/custom-errors";

export const errorHandler =(
err:Error,
req:Request,
res:Response,
next:NextFunction
)=>{

    if(err instanceof CustomError){
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }

    res.status(400).send({
       errors:[{
        message:'Something went wrong!'
       }]
    })
    
};

//Maintaining a uniform error response structure :
/* 
    error:[{
        message: some string,
        other properties
    }]

    our returned object of error is always an array of objects containing an array of errors

*/