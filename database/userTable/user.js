const Sequelize = require('sequelize');
const connection = require('../connection');
connection.sync(); //Chama a conexão com o banco de dados para que as tabelas sejam criadas

const user = connection.define('users', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    keyword: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = user;