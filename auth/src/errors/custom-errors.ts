//defining a custom error class to make sure all the other error classes follow the same structure
export abstract class CustomError extends Error{
    abstract statusCode : number;

    constructor(message:string){
        super(message);
        Object.setPrototypeOf(this,CustomError.prototype);
    }

    abstract serializeErrors():{message:string, field?:string}[]
}

