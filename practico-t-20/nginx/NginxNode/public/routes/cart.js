const express = require('express');
const Router = express.Router;
const { saveOrder } = require( "../controllers/cartController" );
const routerCart = Router();

routerCart.post('/', saveOrder);

module.exports = routerCart;
