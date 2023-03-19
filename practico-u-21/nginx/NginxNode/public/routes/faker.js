const express = require('express');
const { FakerController } = require( "../controllers/fakerController" );
const Router = express.Router;
const router = Router();

class routerFaker {
    constructor() {
        this.fakerController = new FakerController();
    }

    start() {
        router.get('/', this.fakerController.fakerProducts);
        return router;
    }
}



module.exports = routerFaker

