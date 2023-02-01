const cluster = require("cluster");
const os = require("os");
const log = require("../utils/logger.js").log;

exports.clusterConfig = () => {
    cluster.setupPrimary( {
        exec: "./server/server.js",
        args: process.argv.slice( 2 ),
        silent: false
    } );

    cluster.on( "online", ( worker ) => {
        log.info( `Worker ${ worker.process.pid } is online` );
    } );

    cluster.on( "exit", ( worker, code, signal ) => {
        log.info( `Worker ${ worker.process.pid } died with code: ${ code }, and signal: ${ signal }` );
        log.info( "Starting a new worker" );
        cluster.fork();
    } );
    for( let i = 0; i < os.cpus().length; i++ ) {
        cluster.fork();
    }
}
