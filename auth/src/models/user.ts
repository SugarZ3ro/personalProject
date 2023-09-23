import mongoose from 'mongoose';
import { Password } from '../services/password';

interface UserAttrs {
    email: string;
    password: string;
  }
//an interface that describes the properties
//that are required to create a new User.
interface UserModel extends mongoose.Model<UserDoc>{
    build(attrs: UserAttrs):UserDoc;
}

//an interface describing the attributes of a user document.
interface  UserDoc extends mongoose.Document{
    email:string;
    password: string;
}


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
  },{
    toJSON : {
      transform(doc,ret){
        ret.id=ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      }
    }
  }
);

userSchema.pre('save', async function(done) {
   if(this.isModified('password')){
    const hashed = await  Password.toHash(this.get('password'));
    this.set('password',hashed);
   }
})



//adding a function to the mongoose model
//this function will be called instead of the new User() method
//this function does type checking while creating a new User object
userSchema.statics.build = (attrs: UserAttrs)=>{
    return new User(attrs);
}

//check the mongoose.model function type definitions for more on generics <UserDoc,UserModel>
const User = mongoose.model<UserDoc,UserModel>('User', userSchema);

export { User };



// An interface that describes the properties
// that are requried to create a new User
// interface UserAttrs {
//     email: string;
//     password: string;
//   }
// const buildUser = (attrs: UserAttrs) => {
//     return new User(attrs);
//   };
