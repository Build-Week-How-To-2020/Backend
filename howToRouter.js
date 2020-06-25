
const express = require('express')
const db = require('./db-config')
const howToRouter = express.Router()

howToRouter.get('/',async (req,res)=> {
  const howTos = await db('how-to')
  res.status(200).json({howTos})
})

howToRouter.get('/:id',(req,res)=> {
    return db('how-to').where({id:req.params.id}).first()
    .then(resp => {
        if(resp){
            res.status(200).json({resp})
        } else {
            res.status(400).json({message: 'how-to does not exist.'})
        }
    })
    .catch(err => {
        res.status(400).json({message:'how-to does not exist.'})
    })
   
})

howToRouter.get('/byUser/:id', (req,res) => {
    return db('how-to').where({userid: req.params.id})
    .then(resp => {
        if(resp.length > 0){
            res.status(200).json({resp})
        } else {
            res.status(404).json({message: 'no how-to found.'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'no how-to found.'})
    })
})

howToRouter.post('/:id',(req,res)=> {
  req.body.userid = req.params.id
  req.body.steps = 0
  return db('how-to').insert(req.body)
  .then(resp => {
      res.status(201).json({message:`your how-to '${req.body.name}' has been created!`})
  })
  .catch(err => {
      res.status(400).json({message: 'how-to not created'})
  })
})

howToRouter.put('/:id',(req,res)=> {
  const changes = req.body
  return db('how-to').where({id: req.params.id}).update(changes)
    .then(resp => {
        if(resp){
            res.status(200).json({message: 'your how-to has been updated!'})
        } else {
            res.status(400).json({message: 'how-to not updated.'})
        }
    })
    .catch(err => {
        res.status(500).json({message:'something went wrong.'})
    })
})

howToRouter.delete('/:id',(req,res)=> {
  return db('how-to').where({id: req.params.id}).delete()
  .then(resp => {
      if(resp){
          res.status(200).json({message:'your how-to has been deleted.'})
      } else {
          res.status(400).json({message: 'how-to does not exist.'})
      }
  })
  .catch(err => {
    res.status(400).json({message: 'how-to does not exist.'})
  })
})

module.exports = howToRouter





