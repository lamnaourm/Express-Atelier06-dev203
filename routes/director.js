const express = require('express')
const mongoose = require('mongoose')
const DirectorModel = require('../models/DirectorModel')
const MovieModel = require('../models/DirectorModel')

const routes = express.Router(); 

routes.get('/all', (req, res) => {
    DirectorModel.find({}, (err, actors) => {
        if(!err)
            res.status(201).json(actors);
        else 
            res.status(507).json({message: err})
    })
})

routes.get('/names', (req, res) => {

    DirectorModel.distinct("name", (err, actors) => {
        if(!err)
            res.status(201).json(actors);
        else 
            res.status(507).json({message: err})
    })
})

routes.get('/movies', (req, res) => {

    MovieModel.aggregate([{$unwind:"$director"}, {$group:{_id:"$director", nb_film:{$sum:1}}}, {$project: {_id:0, actor_name:"$_id", nombre_film:"$nb_film"}}], (err, actors) => {
        if(!err)
            res.status(201).json(actors);
        else 
            res.status(507).json({message: err})
    })
})

routes.post("/add", (req, res) => {
    const director = new DirectorModel(req.body);
    director.save((err, director) => {
      if (!err) res.status(201).json(director);
      else res.status(507).json({ message: err });
    });
  });
  
  routes.put("/update/:name", (req, res) => {
    DirectorModel.findOne({ name: req.params.name }, (err, director) => {
      if (!err && director == null) return res.sendStatus(404);
  
      DirectorModel.updateOne({ name: req.params.name }, req.body, (err, director) => {
        if (!err) res.status(202).json(director);
        else res.status(507).json({ message: err });
      });
    });
  });
  
  routes.delete("/delete/:name", (req, res) => {
    DirectorModel.findOne({ name: req.params.name }, (err, director) => {
      if (!err && director == null) return res.sendStatus(404);
  
      DirectorModel.deleteOne({ name: req.params.name }, (err, director) => {
        if (!err) res.status(202).json(director);
        else res.status(507).json({ message: err });
      });
    });
  });

module.exports = routes