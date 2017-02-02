'use strict';
// Include our "db"
var db = require('../../config/db')();
// Exports all the functions to perform on the db
module.exports = {getAll, save, getOne, update, delGame};

//GET /game operationId
function getAll(req, res, next) {
  res.json({ games: db.find()});
}
//POST /game operationId
function save(req, res, next) {
  res.json({success: db.save(req.body), description: "Game added to the list!"});
}
//GET /game/{id} operationId
function getOne(req, res, next) {
  var id = req.swagger.params.id.value; //req.swagger contains the path parameters
  var game = db.find(id);
  if(game) {
    res.json(game);
  }else {
    res.status(204).send();
  }
}
//PUT /game/{id} operationId
function update(req, res, next) {
  var id = req.swagger.params.id.value; //req.swagger contains the path parameters
  var game = req.body;
  if(db.update(id, game)){
    res.json({success: 1, description: "Game updated!"});
  }else{
    res.status(204).send();
  }

}
//DELETE /game/{id} operationId
function delGame(req, res, next) {
  var id = req.swagger.params.id.value; //req.swagger contains the path parameters
  if(db.remove(id)){
    res.json({success: 1, description: "Game deleted!"});
  }else{
    res.status(204).send();
  }

}