import express from "express";
import { json } from "body-parser";
import 'express-async-errors';

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import cookieSession from "cookie-session";

const app = express();
app.set('trust proxy',true); //our traffic is currently being proxied by ingress-nginx
app.use(json());
app.use(cookieSession({      // cookie support
  signed:false,
  secure:process.env.NODE_ENV !== 'test'
})
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.use(errorHandler); 


export {app};