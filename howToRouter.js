
const express = require('express')
const db = require('./db-config')
const howToRouter = express.Router()

howToRouter.get('/',async (req,res)=> {
  const howTos = await db('how-to')
  res.status(200).json({howTos})
})

howToRouter.get('/:id',async (req,res)=> {
    const howTo = await db('how-to').where({id:req.params.id})
    howTo.body.steps = db('steps').where({'how-to-id':id}).length()
    res.status(200).json({howTo})
})

howToRouter.post('/:id',(req,res)=> {
  req.body.userid = req.params.id
  req.body.steps = 0
  db('how-to').insert(req.body)
  .then(resp => {
      res.status(201).json({message:`your how-to '${req.body.name}' has been created!`})
  })
  .catch(err => {
      res.status(400).json({message: 'how-to not created'})
  })
})

howToRouter.put('/:id',(req,res)=> {
  
})

howToRouter.delete('/:id',(req,res)=> {
  
})

module.exports = howToRouter





