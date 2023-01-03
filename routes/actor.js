const express = require("express");
const ActorModel = require("../models/ActorModel");
const MovieModel = require("../models/MovieModel");
const routes = express.Router();

routes.get("/all", (req, res) => {
  ActorModel.find({}, (err, actors) => {
    if (!err) res.status(201).json(actors);
    else res.status(507).json({ message: err });
  });
});

routes.get("/names", (req, res) => {
  ActorModel.distinct("name", (err, actors) => {
    if (!err) res.status(201).json(actors);
    else res.status(507).json({ message: err });
  });
});

routes.get("/movies", (req, res) => {
  MovieModel.aggregate(
    [
      { $unwind: "$actors" },
      { $group: { _id: "$actors", nb_film: { $sum: 1 } } },
      { $project: { _id: 0, actor_name: "$_id", nombre_film: "$nb_film" } },
    ],
    (err, actors) => {
      if (!err) res.status(202).json(actors);
      else res.status(507).json({ message: err });
    }
  );
});

routes.post("/add", (req, res) => {
  const acteur = new ActorModel(req.body);
  acteur.save((err, actor) => {
    if (!err) res.status(201).json(actor);
    else res.status(507).json({ message: err });
  });
});

routes.put("/update/:name", async (req, res) => {
  await ActorModel.findOne({ name: req.params.name }, (err, actor) => {
    if (!err && actor == null) return res.sendStatus(404);

    ActorModel.updateOne({ name: req.params.name }, req.body, (err, actor) => {
      if (!err) res.status(202).json(actor);
      else res.status(507).json({ message: err });
    });
  });
});

routes.delete("/delete/:name", async (req, res) => {
  await ActorModel.findOne({ name: req.params.name }, (err, actor) => {
    if (!err && actor == null) return res.sendStatus(404);

    ActorModel.deleteOne({ name: req.params.name }, (err, actor) => {
      if (!err) res.status(202).json(actor);
      else res.status(507).json({ message: err });
    });
  });
});

module.exports = routes;
