export class DatabaseConnectionError extends Error {
    reason = "Error connecting to database";
    constructor(){
        super();
        //Only because we are extending a builtin class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
        //Sets the prototype of the current object to the RequestValidationError prototype, 
        //allowing us to inherit properties and methods from the RequestValidationError prototype.

    }
}


//also could have been declared as :
// export class DatabaseConnectionError extends Error {
//     constructor(public errors:ValidationError[]){
//         super();
//            Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
//     }
// }


//using the public/private/protected keyword while declaring the constructor parameters
//has the same effect as first defining the attributes first and then initializing them in the constructor