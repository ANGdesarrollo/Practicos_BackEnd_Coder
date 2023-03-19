const express = require( 'express' );
const compression = require( "compression" );
const InfoController = require( "../controllers/infoController" );
const Router = express.Router;
const router = Router();

class RouterInfo {
    constructor() {
        this.infoController = new InfoController();
    }

    start() {
        router.get( '/', this.infoController.getInfo );
        router.get( '/gzip', compression(), this.infoController.getInfo );
        return router;
    }
}


module.exports = RouterInfo;
