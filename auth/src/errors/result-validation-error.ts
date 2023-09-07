import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {
    errors: ValidationError[]
    constructor(errors:ValidationError[]){
        super();
        this.errors = errors;

        //Only because we are extending a builtin class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
        //Sets the prototype of the current object to the RequestValidationError prototype, 
        //allowing us to inherit properties and methods from the RequestValidationError prototype.

    }
}

//also could have been declared as :
// export class RequestValidationError extends Error {
//     constructor(public errors:ValidationError[]){
//         super();
//            Object.setPrototypeOf(this, RequestValidationError.prototype);
//     }
// }


//using the public/private/protected keyword while declaring the constructor parameters
//has the same effect as first defining the attributes first and then initializing them in the constructor