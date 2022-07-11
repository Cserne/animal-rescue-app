require('dotenv').config();
const app = require('../app');
const mockserver = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require ('mongodb-memory-server');
const User = require('../models/user');
const { startDB, stopDb, deleteAll } = require('./util/inMemoryDB');

describe('/api/helprequest tests', () => {

    // jest.setTimeout(30000);

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

    test('test user gets helprequests list', async () => {
    //     // given
        const newUser = new User({
            username: 'Cirmi',
            email: 'cirmi@gmail.com',
            password: 'cirmi'
        });
        await newUser.save();

        const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);
        client.set('authorization', token);
    
    //     // when
        const response = await client.get('/api/helprequest');
        
    //     //then
        expect(response.status).toBe(200);
        const responseData = response.body;
        expect(responseData).toStrictEqual([]);
    });


    // EZ JÓ-E VAJON?
    // test('should return 200 when test user posts a new helprequest with all the data required', async () => {
    // //     // given
    //     const newUser = new User({
    //         username: 'Cirmi',
    //         email: 'cirmi@gmail.com',
    //         password: 'cirmi'
    //     });
    //     await newUser.save();

    //     const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);
    //     client.set('authorization', token);
    
    // //     // when
    //     const response = await client.post('/api/helprequest').send({
    //         species: 'cica',
    //         city: 'Szeged',
    //         date: 2022,
    //         description: 'Találtam egy cicát.'
    //     });
        
    // //     //then
    //     expect(response.status).toBe(200);
    //     const usersInDb = await User.find({});
    //     expect(usersInDb.length).toBe(1);
    //     // expect(usersInDb[0].helprequests[0].species).toBe('cica');

    // });

    test('should return 422 when test user posts a new helprequest without species', async () => {
    //     // given
        const newUser = new User({
            username: 'Cirmi',
            email: 'cirmi@gmail.com',
            password: 'cirmi'
        });
        await newUser.save();

        const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);
        client.set('authorization', token);
    
    //     // when
        const response = await client.post('/api/helprequest').send({
            city: 'Szeged',
            date: 2022,
            description: 'Találtam egy cicát.'
        });
        
    //     //then
        expect(response.status).toBe(422);
    });

    test('should return 422 when test user posts a new helprequest without city', async () => {
    //     // given
        const newUser = new User({
            username: 'Cirmi',
            email: 'cirmi@gmail.com',
            password: 'cirmi'
        });
        await newUser.save();

        const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);
        client.set('authorization', token);
    
    //     // when
        const response = await client.post('/api/helprequest').send({
            species: 'cica',
            date: 2022,
            description: 'Találtam egy cicát.'
        });
        
    //     //then
        expect(response.status).toBe(422);
    });

    test('should return 422 when test user posts a new helprequest without date', async () => {
    //     // given
        const newUser = new User({
            username: 'Cirmi',
            email: 'cirmi@gmail.com',
            password: 'cirmi'
        });
        await newUser.save();

        const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);
        client.set('authorization', token);
    
    //     // when
        const response = await client.post('/api/helprequest').send({
            species: 'cica',
            city: 'Szeged',
            description: 'Találtam egy cicát.'
        });
        
    //     //then
        expect(response.status).toBe(422);
    });

    test('should return 422 when test user posts a new helprequest without description', async () => {
    //     // given
        const newUser = new User({
            username: 'Cirmi',
            email: 'cirmi@gmail.com',
            password: 'cirmi'
        });
        await newUser.save();

        const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);
        client.set('authorization', token);
    
    //     // when
        const response = await client.post('/api/helprequest').send({
            species: 'cica',
            city: 'Szeged',
            date: 2022
        });
        
    //     //then
        expect(response.status).toBe(422);
        // const usersInDb = await User.find({});
        // expect(usersInDb.length).toBe(1);
        // expect(usersInDb[0].species).toBe('cica');
        // expect(usersInDb[0].city).toBe('Szeged');
        // const responseData = response.body;
        // expect(responseData).toStrictEqual([{species: 'cica', city: 'Szeged', date: 2022, description: 'Találtam egy cicát.'}]);

    });

    test('should return 200 when test user searches helprequests by city', async () => {
    //     // given
        const newUser = new User({
            username: 'Cirmi',
            email: 'cirmi@gmail.com',
            password: 'cirmi'
        });
        await newUser.save();

        const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);
        client.set('authorization', token);

    //     // when
        const response = await client.get('/query/api/helprequest?city=szeged');
        
    //     //then
        expect(response.status).toBe(200);
        const responseData = response.body;
        expect(responseData).toStrictEqual([]);

        // const usersInDb = await User.find({});
        // expect(usersInDb.length).toBe(1);
        // expect(usersInDb[0].species).toBe('cica');
        // expect(usersInDb[0].city).toBe('Szeged');
        // const responseData = response.body;
        // expect(responseData).toStrictEqual([{species: 'cica', city: 'Szeged', date: 2022, description: 'Találtam egy cicát.'}]);

    });

    test('should return 200 when test user sends get request to check all the users ', async () => {
    //     // given
        const newUser = new User({
            username: 'Cirmi',
            email: 'cirmi@gmail.com',
            password: 'cirmi'
        });
        await newUser.save();

        const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);
        client.set('authorization', token);

    //     // when
        const response = await client.get('/api/user');
        
    //     //then
        expect(response.status).toBe(200);
        // const responseData = response.body;
        // expect(responseData).toEqual([{_id: '62c85122dec6f0545215c852', username: 'Cirmi',
        // email: 'cirmi@gmail.com',
        // password: 'cirmi', helpRequests: []}]);

        const usersInDb = await User.find({});
        expect(usersInDb.length).toBe(1);
        expect(usersInDb[0].username).toBe('Cirmi');
        expect(usersInDb[0].email).toBe('cirmi@gmail.com');
        expect(usersInDb[0].password).toBe('cirmi');
        // const responseData = response.body;
        // expect(responseData).toStrictEqual([{species: 'cica', city: 'Szeged', date: 2022, description: 'Találtam egy cicát.'}]);

    });

    test('should return 200 when test user deletes one of his helprequests ', async () => {
    //     // given
        const newUser = new User({
            username: 'Cirmi',
            email: 'cirmi@gmail.com',
            password: 'cirmi',
            helpRequests: [{_id: '62c852240dea0f4ed695c381', species: 'cica', city: 'Szeged', date: 2022, description: 'Találtam egy cicát.'}]
        });
        await newUser.save();

        const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);
        client.set('authorization', token);

    //     // when
        const response = await client.delete('/api/helprequest/62c852240dea0f4ed695c381');
        
    //     //then
        expect(response.status).toBe(200);
        const usersInDb = await User.find({});
        expect(usersInDb.length).toBe(1);
        expect(usersInDb[0].helpRequests).toStrictEqual([]);
    });

    test('should return 200 when user posts a help to one of the another users helprequests', async () => {
    //     // given
        const newUser1 = new User({
            username: 'Cirmi',
            email: 'cirmi@gmail.com',
            password: 'cirmi',
            helpRequests: [{_id: '62c852240dea0f4ed695c381', species: 'cica', city: 'Szeged', date: 2022, description: 'Találtam egy cicát.'}]
        });
        await newUser1.save();
        const newUser2 = new User({
            // _id: '62c863ae0b97fe7a5a9672ad',
            username: 'Bodri',
            email: 'bodri@gmail.com',
            password: 'bodri'
        })
        await newUser2.save();

        const token = jwt.sign({ _id: newUser2._id }, process.env.JWT_SECRET);
        client.set('authorization', token);

    //     // when
        const response = await client.post('/api/helprequest/62c852240dea0f4ed695c381/help').send({
            description: 'Segítek'
        });
        
    //     //then
        expect(response.status).toBe(200);
        const usersInDb = await User.find({});
        expect(usersInDb.length).toBe(2);
        expect(usersInDb[0].helpRequests[0].helps[0].userId).toEqual(newUser2._id);
        expect(usersInDb[0].helpRequests[0].helps[0].description).toEqual('Segítek');
    });


    //EZ MIÉRT NEM JÓ?
    test('should return 200 when user updates a help', async () => {
    //     // given
        const newUser1 = new User({
            username: 'Cirmi',
            email: 'cirmi@gmail.com',
            password: 'cirmi',
            helpRequests: [{_id: '62c852240dea0f4ed695c381', species: 'cica', city: 'Szeged', date: 2022, description: 'Találtam egy cicát.', helps: [{_id: '62c852240dea0f4ed695c393', userId: '62c863ae0b97fe7a5a9672ad', description: 'Segítek'}]}]
        });
        await newUser1.save();
        const newUser2 = new User({
            _id: '62c863ae0b97fe7a5a9672ad',
            username: 'Bodri',
            email: 'bodri@gmail.com',
            password: 'bodri'
        })
        await newUser2.save();

        const token = jwt.sign({ _id: newUser2._id }, process.env.JWT_SECRET);
        client.set('authorization', token);

    //     // when
        const response = await client.patch('/api/helprequest/62c852240dea0f4ed695c381/help/62c852240dea0f4ed695c393').send({
            description: 'Köszönöm!'
        });
        
    //     //then
        expect(response.status).toBe(200);
        const usersInDb = await User.find({});
        expect(usersInDb.length).toBe(2);
        expect(usersInDb[0].helpRequests[0].helps[0].userId).toEqual(newUser2._id);
        expect(usersInDb[0].helpRequests[0].helps[0].description).toEqual('Segítek Cirmi: Köszönöm!');
    });

    test('should return 200 when user deletes account', async () => {
    //     // given
        const newUser = new User({
            username: 'Cirmi',
            email: 'cirmi@gmail.com',
            password: 'cirmi',
        });
        await newUser.save();

        const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);
        client.set('authorization', token);

    //     // when
        const response = await client.delete('/api/user/newUser._id');
        
    //     //then
        expect(response.status).toBe(200);
        const usersInDb = await User.find({});
        expect(usersInDb.length).toBe(0);
    });

    // test('should return 200 when test user posts a new helprequest with all required data', async () => {
    //    // given
    //     const newUser = new User({
    //         username: 'Cirmi',
    //         email: 'cirmi@gmail.com',
    //         password: 'cirmi'
    //     });
    //     await newUser.save();

    //     const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);
    //     client.set('authorization', token);
    
    //     // when
    //     const response = await client.post('/api/helprequest').send({
    //         species: 'cica',
    //         city: 'Szeged',
    //         date: 2022,
    //         description: 'Találtam egy cicát.'
    //     });
        
    //     //then
        
    //     expect(response.status).toBe(200);
    //     // const usersInDb = await User.find({});
    //     // expect(usersInDb.length).toBe(1);
    //     // expect(usersInDb[0].species).toBe('cica');
    //     // expect(usersInDb[0].city).toBe('Szeged');
    //     // const responseData = response.body;
    //     // expect(responseData).toStrictEqual([{species: 'cica', city: 'Szeged', date: 2022, description: 'Találtam egy cicát.'}]);

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
    //     const response = await client.get('/api/helprequests');
        
    //     //then
    //     expect(response.status).toBe(200);
    //     const responseData = response.body;
    //     expect(responseData.user).toBeNull();
    // });

}) 
