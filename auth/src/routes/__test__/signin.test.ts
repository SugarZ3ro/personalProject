
import request from "supertest";
import { app } from "../../app";



it('fails when a email that does not exist is supplied' , async ()=>{
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.gmail',
            password: 'password'
        })
        .expect(400);
});

it('fails when an incorrect password is suplied', async ()=>{
    await request(app)
        .post('/api/users/signup')          //first making sure there is a account to test signIn
        .send({
            email: 'test@test.gmail.com',
            password: 'password'
        })
        .expect(201)

    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.gmail.com',
            password: 'wrongPassword'
        })
        .expect(400)
})


it('responds with a cookie when given valid credentials',async ()=>{
    await request(app)
        .post('/api/users/signup')          //first making sure there is a account to test signIn
        .send({
            email: 'test@test.gmail.com',
            password: 'password'
        })
        .expect(201)

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.gmail.com',
            password: 'password'
        })
        .expect(200)
        expect(response.get('Set-Cookie')).toBeDefined();
})

