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


}) 
