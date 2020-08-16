const Sequelize = require('sequelize');
/**
 * Antes de iniciar a aplicação, altere a senha (123456) para a senha da sua conexão mysql
 * Crie diretamente no workbench ou via linha de comando o banco de dados "userDB"
 */
const connection = new Sequelize('userDB', 'root', 'sorakaad', { // respectivamente Banco de dados, usuario, senha da conexão
    host: 'localhost',
    dialect: 'mysql' //banco de dados usado aqui
});

module.exports = connection;