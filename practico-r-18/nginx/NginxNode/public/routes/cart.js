const express = require('express');
const Router = express.Router;
const { saveOrder } = require( "../controllers/cart" );
const routerCart = Router();

routerCart.post('/', saveOrder);

module.exports = routerCart;
