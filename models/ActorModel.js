const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const ActorSchema = new Schema({
    name:String,
    birthname: String,
    birthdate: String,
    birthplace: String,
    died: String, 
    restingplace:String
})

module.exports = mongoose.model("actors", ActorSchema) 