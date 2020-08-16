const express = require('express');
const controller = require('../../controllers/register/userRegister');

const routes = express.Router();

routes.post('/register', controller.register);

module.exports = routes;