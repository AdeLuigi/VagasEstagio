const { Router } = require('express');
const Cadastro = require('../models/Cadastro');
const Vagas = require('../models/Vaga');
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

routes.post('/vaga', async (request, response) => {

    const { title, description, city, district, wage, schedule} = request.body;

    if((title == '') || (description == '') || (city == '') || (district == '') || (wage == '') || (schedule == '')){
        return response.json({error:'algum campo está faltando'})
    }

    const vaga = await Vagas.create({
        title,
        description,
        city,
        district,
        wage,
        schedule,
    });

    if (vaga) { 
        return response.json(vaga);
    }else{
        return response.json({error:"Deu ruim na criação da vaga"});
    }

});

routes.get('/vaga', async (request, response) => {

    const vaga = await Vagas.find();

    if (vaga) { 
        return response.json(vaga);
    }else{
        return response.json({error:"Deu ruim na listagem de vagas"});
    }

});

routes.get(`/vaga/:idVaga`, async (request, response) => {
    const { idVaga } = request.params;

    const vaga = await Vagas.findById(idVaga); 

    if (vaga) { 
        return response.json(vaga);
    }else{
        return response.json({error:"Deu ruim na listagem de vagas"});
    }

});

routes.put(`/vaga/:idVaga`, async (request, response) => {
    const { idVaga } = request.params;
    const { userId } = request.body;

    if(!userId){
        return response.json({error:"id não foi passado"});
    }

    const vaga = await Vagas.findById(idVaga); 

    if (vaga) { 
        vaga.candidates = [...vaga.candidates, userId]

        await vaga.save();

        return response.json(vaga);
    }else{
        return response.json({error:"Deu ruim ao se candidatar na vaga"});
    }

});



module.exports = routes;