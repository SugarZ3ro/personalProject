import { ValidationError } from "express-validator";
import { CustomError } from "./custom-errors";

export class RequestValidationError extends CustomError {
    statusCode = 400;
    errors: ValidationError[]
    constructor(errors:ValidationError[]){
        super("result validation Error");
        this.errors = errors;

        //Only because we are extending a builtin class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
        //Sets the prototype of the current object to the RequestValidationError prototype, 
        //allowing us to inherit properties and methods from the RequestValidationError prototype.

    }
    serializeErrors() {
      return this.errors.map((err) => {
        if (err.type === 'field') {
          return { message: err.msg, field: err.path };
        }
        return { message: err.msg };                  //to satisfy TS we use another return statement for the other control path
                                                      // else the return type of the function becomes  ...| any;
      });
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