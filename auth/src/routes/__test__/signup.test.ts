
import request from "supertest";
import { app } from "../../app";

it('returns a 201 on successful signup',async ()=>{
    return request(app)             // the express object that we are testing
        .post('/api/users/signup') //the request type and where we are sending the request
        .send({                     //body of the request
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);               //expecting a status code of 201 on success
})

it('returns a 400 with an invalid email',async ()=>{
    return request(app)            
    .post('/api/users/signup') 
    .send({                     
        email: 'testtest.com',      //invalid email
        password: 'password'
    })
    .expect(400);               

})

it('returns a 400 with an invalid password',async ()=>{
    return request(app)            
    .post('/api/users/signup') 
    .send({                     
        email: 'test@test.com',      
        password: 'p'               //invalid password
    })
    .expect(400);               

})

it('returns a 400 with missing email or password',async ()=>{
    
    await request(app)            
    .post('/api/users/signup') 
    .send({
        email: 'anshuman@test.com'
    })
    .expect(400); 
    
    return request(app)            
    .post('/api/users/signup') 
    .send({
        password: 'passe'
    })
    .expect(400);               

})

it('dissallows duplicate emails', async ()=>{
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        expect(201);
    
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400);
})

it('sets a cookie after a successfull signup',async ()=>{
    const response = await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    expect(201);
    expect(response.get('Set-Cookie')).toBeDefined(); //response.get()is a built in function in the response object
                                                    //that can be used to access the headers of the response
})
