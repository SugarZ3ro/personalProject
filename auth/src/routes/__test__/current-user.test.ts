import { currentUser } from './../../middlewares/current-user';
import request from "supertest";
import { app } from "../../app";


it('responds with details about the current user',async()=>{
    const authResponse = await request(app)
        .post('/api/users/signup')
        .send({
            email : 'test@test.com',
            password: 'password'
        })
        .expect(201)

        /*
        * supertest does not send cookies in the subsequent requests after auth
        * (we get cookies after signing up or after signing in)
        * so we have to add cookies manually into the request headers
        */
    
        const cookie = authResponse.get('Set-Cookie');

    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie',cookie)
        .send()
        .expect(200);
    
    //currentuser route sends back information about the user 
    //ex: the current user email
    expect(response.body.currentUser.email).toEqual('test@test.com');
    
    
})