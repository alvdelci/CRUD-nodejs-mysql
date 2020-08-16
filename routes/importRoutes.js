const regRoute = require('./register/routeRegister'); //Importação da rota de cadastro do usuario

const logRoute = require('./login/routeLogin'); //importação da rota de login

module.exports = {
    regRoute,
    logRoute
};

/**
 * No arquivo index.js basta importar as rotas a partir desse arquivo
 */