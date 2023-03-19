const express = require('express');
const Router = express.Router;
const { CartController } = require( "../controllers/cartController" );
const router = Router();

class routerCart {
    constructor() {
        this.cartController = new CartController();
    }

    start() {
        router.post('/', this.cartController.saveOrder);
        return router;
    }
}

module.exports = routerCart;
