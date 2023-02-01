import { log } from "../utils/logger.js";
import { fork } from 'child_process';



export const calculateRandoms = ( req, res ) => {
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

