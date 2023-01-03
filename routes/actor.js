const express = require('express')
const ActorModel = require('../models/ActorModel')
const routes = express.Router(); 

routes.get('/all', (req, res) => {

    ActorModel.find({}, (err, actors) => {
        if(!err)
            res.status(201).json(actors);
        else 
            res.status(507).json({message: err})
    })
})

module.exports = routes