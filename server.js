const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());


server.get('/', (req, res)=> {
     res.send('<h3>Hello this is DB unit</h3>')
})

module.exports = server;