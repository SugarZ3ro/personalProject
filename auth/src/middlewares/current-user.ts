import { Request , Response,NextFunction } from "express";
import jwt from 'jsonwebtoken';


interface UserPayload {
    id:string;
    email: string;
}

//augmenting the request type definition
//to add the currentUser value in the request object
declare global{
    namespace Express{
        interface Request{
            currentUser?: UserPayload
        }
    }
}

export const currentUser =(
    req:Request,
    res: Response,
    next: NextFunction
)=> {
  if(!req.session?.jwt){        //  !req.session || !req.session.jwt
    return next();
  }

  try {
    const payload =  jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
    req.currentUser = payload;      //without augmenting the request type definition this line gives error 
                                    //saying that the request object has no attribute as currentUser.
    
} catch (err) {}
  next();
}