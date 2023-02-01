import { log } from "../utils/logger.js";

export const getInfo = (req, res) => {
    try{
        const data = {
            args: process.argv,
            opSystem: process.platform,
            nodeVersion: process.version,
            rss: process.memoryUsage().rss,
            path: process.cwd(),
            processID: process.pid
        }

        res.json({
            status: true,
            data
        })

    } catch(err){
        log.error(err)
    }
}

