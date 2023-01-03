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

routes.post("/add", (req, res) => {
    const acteur = new movieModel(req.body);
    acteur.save((err, movie) => {
      if (!err) res.status(201).json(movie);
      else res.status(507).json({ message: err });
    });
  });
  
  routes.put("/update/:name", (req, res) => {
    movieModel.findOne({ name: req.params.name }, (err, movie) => {
      if (!err && movie == null) return res.sendStatus(404);
  
      movieModel.updateOne({ name: req.params.name }, req.body, (err, movie) => {
        if (!err) res.status(202).json(movie);
        else res.status(507).json({ message: err });
      });
    });
  });
  
  routes.delete("/delete/:name", (req, res) => {
    movieModel.findOne({ name: req.params.name }, (err, movie) => {
      if (!err && movie == null) return res.sendStatus(404);
  
      movieModel.deleteOne({ name: req.params.name }, (err, movie) => {
        if (!err) res.status(202).json(movie);
        else res.status(507).json({ message: err });
      });
    });
  });


module.exports = routes