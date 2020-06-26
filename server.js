const express = require('express')
const server = express()
const usersRouter = require('./usersRouter')
const howToRouter = require('./howToRouter')
const stepsRouter = require('./stepsRouter')
const session = require('express-session')
const cors = require('cors')

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
server.use(cors())
server.use(session(sessionConfig))
server.use('/users',usersRouter)
server.use('/howTo',howToRouter)
server.use('/steps',stepsRouter)

module.exports = server
