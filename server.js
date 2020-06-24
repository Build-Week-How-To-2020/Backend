const express = require('express')
const server = express()
const usersRouter = require('./usersRouter')
const howToRouter = require('./howToRouter')
const session = require('express-session')


const sessionConfig = {
  name: 'escon',
  secret:'lambda school scecret',
  cookie: {
    maxAge: 1000 * 80,
    secure: false,
    httpOnly: true,
   },
  resave:false,
  saveUninitialized: false
}

server.use(express.json())
server.use(session(sessionConfig))
server.use('/users',usersRouter)
server.use('/howTo',howToRouter)

module.exports = server
