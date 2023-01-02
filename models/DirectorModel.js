const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const DirectorSchema = new Schema({
    name:String,
    birthname: String,
    birthdate: String,
    birthplace: String
})

module.exports = mongoose.model("directors", DirectorSchema);