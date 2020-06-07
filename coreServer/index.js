const restify = require("restify");
const axios = require("axios").default;
const server = restify.createServer();

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

const axiosInstance = axios.create({
    baseURL: `http://localhost:3000/`
});

const MEME = `/meme`;

function logRequest(req, res, next) {
    let msg = `[${req.getRoute().method}] ${req.href()}`

    if(req.body) {
        msg += ` => ${JSON.stringify(req.body)}`;
    }

    console.log(msg);
    next();
}

server.post(`${MEME}`, logRequest, (req, res) => {
    let URL = 'ec021-av2-core/meme';
    let body = req.body;

    axiosInstance.post(URL, body, {})
        .then((response) => {
            res.json(response.status, response.data);
        })
        .catch((err) => {
            res.json(err.response.data);
        });
});

server.get(`${MEME}`, logRequest, (req, res) => {
    let URL = 'ec021-av2-core/meme/';

    axiosInstance.get(URL, {})
        .then((response) => {
            res.json(response.status, response.data);
        })
        .catch((err) => {
            res.json(err.response.data);
        });
});

server.get(`${MEME}/:id`, logRequest, (req, res) => {
    let URL = 'ec021-av2-core/meme/' + req.params.id;

    axiosInstance.get(URL, {})
        .then((response) => {
            res.json(response.status, response.data);
        })
        .catch((err) => {
            res.json(err.response.data);
        });
});

server.patch(`${MEME}/:id`, logRequest, (req, res) => {
    let URL = 'ec021-av2-core/meme/' + req.params.id;
    let body = req.body;

    axiosInstance.patch(URL, body, {})
        .then((response) => {
            res.json(response.status, response.data);
        })
        .catch((err) => {
            res.json(err.response.data);
        });
});

server.del(`${MEME}`, logRequest, (req, res) => {
    let URL = 'ec021-av2-core/meme/' + req.body.id;

    axiosInstance.delete(URL, {})
        .then((response) => {
            res.json(response.status, response.data);
        })
        .catch((err) => {
            res.json(err.response.data);
        });
});

server.listen(5000, () => {
    console.log(`O servidor está rodando!`);
});