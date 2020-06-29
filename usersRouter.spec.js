const server = require('./server')
const request = require('supertest')
const db = require('./db-config')


describe('ENV',()=>{
    it('verifies the ENV is testing',()=>{
        expect(process.env.DB_ENV).toBe('testing')
    })
})


describe('register', () => {
    beforeEach(async ()=> {
        await db('users').truncate()
    })
    it('registers a new user to database', async ()=> {
        const res = await request(server).post('/users/register')
        .send({username:'waldron02',password:'password02'})
        expect(res.status).toBe(201)
        const users = await db('users')
        expect(users).toHaveLength(1)
    })
});

describe('login', ()=> {
    it('logs existing user in', async ()=>{
       const res = await request(server).post('/users/login')
        .send({username:'waldron02',password:'password02'})
        expect(res.status).toBe(200)
        expect(res.body.message).toBe('welcome waldron02!')
        
    })
})

describe('get users',()=>{
    it('gets users', async ()=>{
      const res = await request(server).get('/users')
      expect(res.status).toBe(200)
      expect(res.body.users).toHaveLength(1)
    })
})