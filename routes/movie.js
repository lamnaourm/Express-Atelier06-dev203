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

module.exports = routes