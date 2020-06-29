const server = require('./server')
const request = require('supertest')
const db = require('./db-config')

describe('creates how-to',()=> {
    it('adds how-to to database',async () => {
        const res = request(server).post('/howTo/1').send({name:'test how-to 1'})
        // expect(res.status).toBe(201)
        
    })
})