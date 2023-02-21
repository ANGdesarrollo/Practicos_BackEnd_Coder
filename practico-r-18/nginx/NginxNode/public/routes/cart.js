const express = require('express');
const Router = express.Router;
const { saveOrder } = require( "../controllers/cart" );
const routerCart = Router();

routerCart.post('/', saveOrder);
routerCart.get('/', (req, res) => console.log('entraron'))

module.exports = routerCart;
