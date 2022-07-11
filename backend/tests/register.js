require('dotenv').config();
const app = require('../app');
const mockserver = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require ('mongodb-memory-server');
const User = require('../models/user');
const { startDB, stopDb, deleteAll } = require('./util/inMemoryDB');
// const {setupGoogleSuccessResponse, setupGoogleErrorResponse} = require('./util/httpMock')

describe('/api/login POST tests', () => {

    let connection;
    let server;
    let client;

    beforeAll(async() => {
        [server, connection] = await startDB();
        client = mockserver.agent(app);
    });

    afterEach(async() => {
        await deleteAll(User);
    });

    afterAll(async() => {
        await stopDb(server, connection);
    });

    
    test('should return 422 without body)', async () => {
        // given
 
        // when
        const response = await client.post('/api/signup').send({});
        
        //then
        expect(response.status).toBe(422);
    });

    test('should return 422 without password)', async () => {
        // given
        const username = 'user1';
        const email = 'user1@gmail.com';
        // when
        const response = await client.post('/api/signup').send({
            username,
            email
        });
        
        //then
        expect(response.status).toBe(422);
    });

    test('should return 422 without email)', async () => {
        // given
        const username = 'user1';
        const password = 'user1';
        // when
        const response = await client.post('/api/signup').send({
            username,
            password
        });
        
        //then
        expect(response.status).toBe(422);
    });

    test('should return 422 without username)', async () => {
        // given
        const email = 'user1@gmail.com';
        const password = 'user1';
        // when
        const response = await client.post('/api/signup').send({
            email,
            password
        });
        
        //then
        expect(response.status).toBe(422);
    });

    test('should return 200 when email is new)', async () => {
        // given
        const username = 'user1';
        const email = 'user1@gmail.com';
        const password = 'user1';
        // when
        const response = await client.post('/api/signup').send({
            username,
            email,
            password
        });
        
        //then
        expect(response.status).toBe(200);
        const usersInDb = await User.find({});
        expect(usersInDb.length).toBe(1);
        expect(usersInDb[0].username).toBe('user1');
    });

    test('should return 422 when username is already taken)', async () => {
        // given
        const username = 'user1';
        const email = 'user1@gmail.com';
        const password = 'user1';
        const response1 = await client.post('/api/signup').send({
            username,
            email,
            password
        });

        // when
        const response2 = await client.post('/api/signup').send({
            username,
            email,
            password
        });
        
        //then
        expect(response2.status).toBe(422);
        const usersInDb = await User.find({});
        expect(usersInDb.length).toBe(1);
        expect(usersInDb[0].username).toBe('user1');
    });
    //1x email, 1xusername, stb. legyen foglalt
    test('should return 422 when email is already taken)', async () => {
        // given
        const username = 'user1';
        const email = 'user1@gmail.com';
        const password = 'user1';
        const response1 = await client.post('/api/signup').send({
            username,
            email,
            password
        });

        // when
        const response2 = await client.post('/api/signup').send({
            username,
            email,
            password
        });
        
        //then
        expect(response2.status).toBe(422);
        const usersInDb = await User.find({});
        expect(usersInDb.length).toBe(1);
        expect(usersInDb[0].email).toBe('user1@gmail.com');
    });

    test('should return 422 when username and email is already taken)', async () => {
        // given
        const username = 'user1';
        const email = 'user1@gmail.com';
        const password = 'user1';
        const response1 = await client.post('/api/signup').send({
            username,
            email,
            password
        });

        // when
        const response2 = await client.post('/api/signup').send({
            username,
            email,
            password
        });
        
        //then
        expect(response2.status).toBe(422);
        const usersInDb = await User.find({});
        expect(usersInDb.length).toBe(1);
        expect(usersInDb[0].username).toBe('user1');
        expect(usersInDb[0].email).toBe('user1@gmail.com');
    });
}) 
