const restify = require("restify");
const mongoose = require("mongoose");
const axios = require("axios").default;
const server = restify.createServer();

const database = require("./database");
const dao = require("./dao");

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

const MEME = '/meme'

//Conecta no servidor de autenticação
const axiosInstanceAuth = axios.create(
    {
        baseURL: `https://ec021-av2-auth.herokuapp.com/` //URL base da rota do AuthServer
    }
);

//Mostra ações executadas
function logRequest(req, res, next) {
    let msg = `[${req.getRoute().method}] ${req.href()}`

    if(req.body) {
        msg += ` => ${JSON.stringify(req.body)}`;
    }

    console.log(msg);
    next();
}

//login do usuario
server.post('/auth/login', logRequest, (req, res) => {
    let URL = 'auth/login'; //baseURL + URL = https://ec021-av2-auth.herokuapp.com/auth/login
    let body = req.body; 

    axiosInstanceAuth.post(URL, body, {}) 
    .then((response) => { 
        res.json(response.status, response.data);
    })
    .catch((err) => { 
        res.json(err.response.data);
    });
});

//validar token
function validation(req, res, next) {
    let auth = 'auth/validateToken'; //auth + baseURL = https://ec021-av2-auth.herokuapp.com/auth/validateToken
    let token = req.headers.token; 

    if(token) { 
        axiosInstanceAuth.post(auth, {},{ 
            headers: {
                token: token
            }
        })
        .then((response) => {
            next();
        })
        .catch((err) =>{ 
            res.json(err.response.status)
        });
    } else { 
        res.send(403);
    }
}

//Criar meme
server.post(`${MEME}`, logRequest, validation,  async (req, res) => {
    let meme = {
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        ano: req.body.ano
    };

    let memeCriado = await dao.insert(meme);
    res.json(201, memeCriado);
});

//Buscar meme
server.get(`${MEME}/:_id`, logRequest, validation, async (req, res) => {
    let memes;
    if(req.params.id !== '') {
        memes = await dao.list(req.params._id);
    } else {
        memes = await dao.list();
    }
    res.json(200, memes);
});

//Atualizar meme
server.patch(`${MEME}/:_id`, logRequest, validation, async (req, res) => {
    let meme = {
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        ano: req.body.ano
    };
    let memeAtualizado = await dao.update(req.params._id, meme);

    res.json(200, memeAtualizado);
});

//Excluir meme
server.del(`${MEME}`, logRequest, validation, async (req, res) => {
    await dao.deleteMeme(req.body.id);

    res.json(200,{});
});

//Rodar o servidor e conectar no banco
server.listen(3000, () => {
    console.log(`O servidor está rodando!`);

    mongoose.connect(database.DB_URL, database.DB_SETTINGS, (err) => {
        if(!err) {
            console.log(`Aplicação conectada com o MongoDB: ${database.DB_SETTINGS.dbName}`);
        } else {
            console.log(`Erro ao conectar com o MongoDB: ${database.DB_URL}`);
            console.log(`Erro: ${err}`);
        }
    })
});