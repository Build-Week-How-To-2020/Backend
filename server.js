const express = require('express')
const server = express()
const usersRouter = require('./usersRouter')
const howToRouter = require('./howToRouter')
const stepsRouter = require('./stepsRouter')
const session = require('express-session')
let {LocalStorage} = require('node-localstorage')
LocalStorage = new LocalStorage('./scratch')


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
server.use('/howTo',auth, howToRouter)
server.use('/steps',stepsRouter)

function auth (req,res,next) {
  if(LocalStorage.getItem('token')){
   return next()
  } else {
    res.status(400).json({message:'you must be logged in!'})
  }
}

module.exports = server
