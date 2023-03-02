const express = require( 'express' );
const getInfo = require( "../controllers/infoController" );
const compression = require( "compression" );
const Router = express.Router;
const routerInfo = Router();

routerInfo.get( '/', getInfo );
routerInfo.get( '/gzip', compression(), getInfo )

module.exports = routerInfo
