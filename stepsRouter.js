const db = require('./db-config')
const express = require('express')
const stepsRouter = express.Router()

stepsRouter.get('/:id',(req,res)=> {
  return db('steps').where({"howToId":req.params.id})
  .then(steps => {
      if(steps.length > 0){
          res.status(200).json({steps})
      } else {
          res.status(404).json({message:'no steps found.'})
      }
  })
  .catch(err => {
      res.status(404).json({message:'no steps found.'})
  })
})

stepsRouter.post('/:id',(req,res)=> {
  req.body.howToId = req.params.id
  return db('steps').insert(req.body)
  .then(async resp => {
      if(resp){
        const howTo = await db('how-to').where({id: req.params.id})
            howTo.update({steps: howTo.steps += 1})
            res.status(200).json({message: `step ${req.body.step-number} added!`})
      } else {
          res.status(400).json({message:'step not added sooo...'})
      }
  })
  .catch(resp => {
    res.status(400).json({message: 'step not added because....'})
  })
})

stepsRouter.put('/:id',(req,res)=> {
  
})

stepsRouter.delete('/:id',(req,res)=> {
  
})

module.exports = stepsRouter





