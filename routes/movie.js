const express = require('express')
const mongoose = require('mongoose')
const movieModel = require('../models/MovieModel')

const routes = express.Router(); 

routes.get('/all', (req, res) => {
    
    movieModel.find({}, (err, actors) => {
        if(!err)
            res.status(201).json(actors);
        else 
            res.status(507).json({message: err})
    })
    
})

routes.get('/names', (req, res) => {

    movieModel.distinct("name", (err, actors) => {
        if(!err)
            res.status(201).json(actors);
        else 
            res.status(507).json({message: err})
    })
})


module.exports = routes