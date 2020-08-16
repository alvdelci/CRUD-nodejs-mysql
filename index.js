/**
 * Para que a aplicação possa ser iniciada deve-se alterar a senha da sua conexão MySQL no arquivo /database/connection.js
 * e criar um banco de dados (userDB) para que as tabelas sejam criadas pelo sistema
 */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./database/connection');
const routes = require('./routes/importRoutes');
const port = 3333;

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', routes.regRoute, routes.logRoute);

app.listen(port, () => {
    console.log(`Online port: ${port}...`);
});

//Testa a conexão com o banco de dados. 
connection.authenticate().then(() => {
    console.log("Conexão com banco de dados estabelecida...");
}).catch((err) => {
    console.log(`Erro ao conectar-se ao banco de dados. Erro: ${err}`);
});