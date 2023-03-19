const express = require('express');
const RandomsController = require( "../controllers/randomsController" );
const Router = express.Router;
const router = Router();

class RouterRandoms {
    constructor() {
        this.randomsController = new RandomsController();
    }

    start() {
        router.post('/', this.randomsController.calculateRandoms)
        return router;
    }
}

module.exports =  RouterRandoms
