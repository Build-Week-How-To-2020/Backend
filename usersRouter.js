
const express = require('express')
const usersRouter = express.Router()
const db = require('./db-config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

usersRouter.get('/', async (req,res)=> {
        const users = await db('users')
        res.status(200).json({users})
    })

usersRouter.get('/:id',(req,res)=> {
    return db('users').where({'id': req.params.id})
    .then(user => {
        if(user){
            res.status(200).json({user})
        } else if(!user){
            res.status(404).json({message: 'user not found'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'something went wrong!'})
    })

})

usersRouter.post('/register',(req,res)=> {
  const hash = bcrypt.hashSync(req.body.password,12)
  req.body.password = hash 
  return db('users').insert(req.body)
    .then(async resp => {
      if(resp){
         const user = await db('users').where({id:resp[0]})
         const token = generateToken(user)
         res.status(201).json({message: `user created, welcome ${req.body.username}!`,token})
      } else {
          res.status(404).json({message: 'user not created'})
      }
  })
    .catch(err => {
        res.status(500).json({message: 'username unavailable!'})
    })

})



usersRouter.post('/login',(req,res)=> {
   let { username, password } = req.body;

   return  db('users').where({username})
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(password,user.password)){
            const token = generateToken(user)
            res.status(200).json({message:`welcome ${req.body.username}!`,token})
        } else {
            res.status(404).json({message: 'invalid credentials'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'something went wrong!'})
    })
})

const generateToken = (user) => {
    const payload = {
        subject: user.id, 
        username: user.username,
        // ...otherData
      };
      const options = {
        expiresIn: '1d', 
      };
      const secret = 'rte5663563tdcvcghf6yethd'

      return jwt.sign(payload, secret, options); 
}

// usersRouter.delete('/:id',(req,res)=> {
//   db('users').where({id: req.params.id}).delete()
//   .then(resp => {
//       if(resp){
//           res.
//       }
//   })
// })

module.exports = usersRouter





