const express = require('express');
const server = express();
const AccountRouter = require('./accounts/accountRouter.js')

server.use(express.json());
server.use('/api/accounts', AccountRouter);

server.get('/', (req, res)=> {
     res.send('<h3>Hello this is DB unit</h3>')
})

module.exports = server;