const express = require('express')
const mongoose = require('mongoose')
const DirectorModel = require('../models/DirectorModel')

const routes = express.Router(); 

routes.get('/all', (req, res) => {
    DirectorModel.find({}, (err, actors) => {
        if(!err)
            res.status(201).json(actors);
        else 
            res.status(507).json({message: err})
    })
})

module.exports = routes