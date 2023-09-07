import express, { Request, Response } from 'express';
import {body, validationResult} from 'express-validator';
import { RequestValidationError } from '../errors/result-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

const router = express.Router();


//using middlewares to validate the incoming request
//using the array object to define what all will happen during validation.
router.post('/api/users/signup',[
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({min:4, max:20})
        .withMessage("Password  must be between 4 and 20 characters.")
],(req: Request,res:Response)=>{
    //after validation the middleware passes us the request with appended attributes(whether there are any errors or not)
    // the WithMessage function is used to append message to the request object 
    
    const errors = validationResult(req);  //checking with the validationResult function to pullout the error message if any.
    if(!errors.isEmpty()){
        throw new DatabaseConnectionError()  //sending an array of error messages if any.
    }
    const {email, password } = req.body;

    console.log('Creating an user...');
    throw new Error("Error connecting to database");   //whatever string is passed to the Error("") function can be accessed by the message attribute in the recieving error object
    
    res.send({})
    

})

export {router as signupRouter};