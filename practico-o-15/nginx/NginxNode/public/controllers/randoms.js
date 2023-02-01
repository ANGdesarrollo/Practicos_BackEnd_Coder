const log = require("../utils/logger").log;
const { fork } = require('child_process');

const calculateRandoms = ( req, res ) => {
    try {
        const computo = fork("./childs/calculateRandomsChild.js");
        computo.send({
            message: "start",
            qty: req.body.param || 100000000
        });
        computo.on("message", (data) => {
            res.json({
                data
            })
        })
    } catch( err ) {
        log.error( err )
    }
}

module.exports = calculateRandoms;

