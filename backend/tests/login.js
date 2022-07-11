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
        const response = await client.post('/api/login').send({});
        
        //then
        expect(response.status).toBe(422);
    });

    test('should return 422 without password)', async () => {
        // given
        const email = 'user1@gmail.com';
        // when
        const response = await client.post('/api/login').send({
            email
        });
        
        //then
        expect(response.status).toBe(422);
    });

    test('should return 422 without email)', async () => {
        // given
        const password = 'user1';
        // when
        const response = await client.post('/api/login').send({
            password
        });
        
        //then
        expect(response.status).toBe(422);
    });


}) 
