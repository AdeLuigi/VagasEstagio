const mongoose = require('mongoose');

const Cadastro = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
})

module.exports = mongoose.model('Cadastro', Cadastro);