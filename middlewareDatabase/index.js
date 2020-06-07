const restify = require("restify");
const mongoose = require("mongoose");
const server = restify.createServer();

const database = require("./database");
const dao = require("./dao");

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

const MEME = '/ec021-av2-core/meme'

function logRequest(req, res, next) {
    let msg = `[${req.getRoute().method}] ${req.href()}`

    if(req.body) {
        msg += ` => ${JSON.stringify(req.body)}`;
    }

    console.log(msg);
    next();
}

server.post(`${MEME}`, logRequest, async (req, res) => {
    let meme = {
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        ano: req.body.ano
    };

    let memeCriado = await dao.insert(meme);
    res.json(201, memeCriado);
});

server.get(`${MEME}/:_id`, logRequest, async (req, res) => {
    let memes;
    if(req.params.id !== '') {
        memes = await dao.list(req.params._id);
    } else {
        memes = await dao.list();
    }
    res.json(200, memes);
});

server.patch(`${MEME}/:_id`, logRequest, async (req, res) => {
    let meme = {
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        ano: req.body.ano
    };
    let memeAtualizado = await dao.update(req.params._id, meme);

    res.json(200, memeAtualizado);
});

server.del(`${MEME}/:id`, logRequest, async (req, res) => {
    await dao.deleteCar(req.params.id);

    res.json(200,{});
});

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