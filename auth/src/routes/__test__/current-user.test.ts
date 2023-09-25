import { Response } from 'express';
import { currentUser } from './../../middlewares/current-user';
import request from "supertest";
import { app } from "../../app";


it('responds with details about the current user',async()=>{   
    //using the global helper function defined in the setup.ts file to get cookies
    const cookie = await global.signin();

    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie',cookie)
        .send()
        .expect(200);
    
    //currentuser route sends back information about the user 
    //ex: the current user email
    expect(response.body.currentUser.email).toEqual('test@test.com');
})

it('responds with null if not authenticated', async()=>{
    const response = await request (app)
        .get('/api/users/currentuser')
        .send()
        .expect(200)

    expect(response.body.currentUser).toEqual(null);
})