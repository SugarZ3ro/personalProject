import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';

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
],
validateRequest,
async (req: Request,res:Response)=>{
   
    const {email, password } = req.body;
    //check if the email already exists in the user database
    const existingUser = await User.findOne({email });

    if(existingUser) {
        throw new  BadRequestError("Email in use");
    }

    const user  = User.build({email,password});
    await user.save();

    
    //Generate JWT
    const usetJwt = jwt.sign({
        id:user.id,
        email:user.email
    },
    process.env.JWT_KEY!        //telling the compiler that "process.env.JWT_KEY" is NOT NULL
                                // so dont complain about it. Done using ! operator after the variable
    );

    //store the jwt on a session object
    req.session = {
        jwt:usetJwt
    };


    res.status(201).send({user});

})

export {router as signupRouter};