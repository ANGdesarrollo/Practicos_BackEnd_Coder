const corsConfig = require( "./corsConfig" );
const logger = require( "../utils/winstonLogger/winstonLogger" );
const getAllProducts = require( "../controllers/socketProductsController" ).getAllProducts;
const saveProduct = require( "../controllers/socketProductsController" ).saveProduct;
const getAllChats = require( "../controllers/socketChatController" ).getAllChats;
const sendMessages = require( "../controllers/socketChatController" ).sendMessages;

const io = ( Server, server, corsPolicy ) => {
    return new Server( server, { cors: corsConfig( corsPolicy ) },
        logger.log( 'info', 'Socket IO online' ) )
}

const sockets = ( io ) => {
    io.on( 'connection', async ( socket ) => {
        socket.on( 'productAdded', ( data ) => saveProduct( data, io ) );
        socket.on( 'dataMessage', async ( data ) => await sendMessages( data, io ) );
        socket.emit( 'allChats', await getAllChats() );
        socket.emit( 'allProducts', await getAllProducts() )
    } )
}

module.exports = {
    io,
    sockets
}




