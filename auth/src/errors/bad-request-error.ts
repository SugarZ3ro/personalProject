//A generic error class
import { CustomError } from "./custom-errors";

export class BadRequestError extends CustomError{
    statusCode=400;

    //take the given incoming error message
    constructor(public message: string){
        super(message);
        Object.setPrototypeOf(this,BadRequestError.prototype);
    }

    //return the error message in the standard form
    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{message:this.message}];
    }
}