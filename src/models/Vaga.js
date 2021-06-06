const mongoose = require('mongoose');

const Vaga = new mongoose.Schema({
    title: String,
    description: String,
    city: String,
    district:String,
    wage: String,
    schedule:String,
    candidates: [mongoose.Types.ObjectId],
    
})

module.exports = mongoose.model('Vaga', Vaga);