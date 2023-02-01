const express = require('express');
const getInfo = require( "../controllers/info" );
const Router = express.Router;
const routerInfo = Router();

routerInfo.get('/', getInfo);

module.exports = routerInfo
