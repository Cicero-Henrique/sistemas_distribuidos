# Sistemas Distribuidos
Repositório para desenvolvimento da segunda entrega do projeto de sistemas distribuídos.

## Execução

Para executar, é necessário ter o [Node](https://nodejs.org/en/download/) instalado.

Na primeira vez, será necessário instalar os `node_modules` na pasta coreServer:

```sh
npm install
```

Para iniciar, abra a pasta `coreServer` e execute:

```sh
npm start
```

Para testar o middleware inicie um servidor na pasta `middlewareDatabase` (É necessário instalar os `node_modules` na primeira vez) E crie um banco de dados chamado `ec021-av2-core` e uma collection chamada `meme`. Envie requests por meio de aplicações como o Postman na aplicação. Alguns exemplos de collections estão disponíveis nos arquivos .postman_collection.

Para encerrar a execução, aperte `Ctrl + C`.