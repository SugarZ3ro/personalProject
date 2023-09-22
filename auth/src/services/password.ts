import {scrypt , randomBytes} from 'crypto'
import { promisify} from 'util';

//script uses callback format but we want to use async await format
// thus we use promisify
const scryptAsync = promisify(scrypt);

export class Password{
    static async toHash  (password:string){
        const salt = randomBytes(8).toString('hex');
        const buffer = await (scryptAsync(password,salt,64)) as Buffer;

        return  `${buffer.toString('hex')}.${salt}`;
    }
    static async compare(storedPassword: string, suppliedPassword: string){
        const [hashedPassword,salt] = storedPassword.split('.');
        const buffer = await (scryptAsync(suppliedPassword,salt,64)) as Buffer;
         
        return buffer.toString('hex') === hashedPassword;
    }
}

//the hashed password is : "<theHashedValue of the given password> + <.> + <the salt value>";

