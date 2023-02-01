const log = require("../utils/logger").log;
const os = require("os");

const cpuLength = () => os.cpus().length;

const getInfo = (req, res) => {
    try{
        const data = {
            args: process.argv,
            opSystem: process.platform,
            nodeVersion: process.version,
            rss: process.memoryUsage().rss,
            path: process.cwd(),
            processID: process.pid,
            cpus: cpuLength()
        }

        res.json({
            status: true,
            data
        })

    } catch(err){
        log.error(err)
    }
}

module.exports = getInfo;

