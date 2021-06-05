const { Router } = require('express');
const Cadastro = require('../models/Cadastro');

const routes = Router();

routes.post('/cadastro', async (request, response) => {

    const {name, email, password} = request.body;

    if((name == '') || (email== '') || (password == '')){
        return response.json({error:'Algum campo está faltando'})
    }

    const verificaEmail = await Cadastro.find({
        email
    });

    if(verificaEmail.length == 1){
        return response.json({error:"Usuário já existe"});
    }

    const cadastrado = await Cadastro.create({
        name,
        email,
        password
    })
    return response.json(cadastrado);
});

routes.get('/login', async (request, response) => {

    const {email, password} = request.body;

    if((email== '') || (password == '')){
        return response.json({error:'algum campo está faltando'})
    }

    const login = await Cadastro.findOne({
        email,
        password
    });

    if (login) { 
        return response.json(login);
    }else{
        return response.json({error:"Usuário não existe"});
    }

});

module.exports = routes;