import express from "express";
import { json } from "body-parser";
import 'express-async-errors';
import mongoose from 'mongoose';
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";


const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.use(errorHandler); 

const start = async () => {
  try {
    console.log("Trying to connect to db!");
    
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

};

app.listen(3000, () => {
  console.log('Listening on port 3000!!!!!!!!');
});

start();


