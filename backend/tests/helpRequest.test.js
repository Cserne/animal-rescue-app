require('dotenv').config();
const app = require('../app');
const mockserver = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require ('mongodb-memory-server');
const User = require('../models/user');
const { startDB, stopDb, deleteAll } = require('./util/inMemoryDB');

describe('/api/helprequest get tests', () => {

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

    // test('test user gets empty list', async () => {
    //     // given
    //     const newUser = new User({
    //         username: 'Cirmi',
    //     });
    //     await newUser.save();

    //     const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
    //     client.set('authorization', token);
    
    //     // when
    //     const response = await client.get('/api/dashboards');
        
    //     //then
    //     expect(response.status).toBe(200);
    //     const responseData = response.body;
    //     expect(responseData.user.dashboards).toStrictEqual([]);
    // });

    // test('deleted user receives null', async () => {
    //     // given
    //     const newUser = new User({
    //         username: 'Cirmi',
    //     });
    //     await newUser.save();

    //     const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET);
    //     client.set('authorization', token);
    //     await User.deleteMany();
    
    //     // when
    //     const response = await client.get('/api/dashboards');
        
    //     //then
    //     expect(response.status).toBe(200);
    //     const responseData = response.body;
    //     expect(responseData.user).toBeNull();
    // });

}) 
