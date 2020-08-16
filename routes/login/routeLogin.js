const express = require('express');
const controller = require("../../controllers/login/userLogin");

const routes = express.Router();

routes.post('/login', controller.login);

module.exports = routes;