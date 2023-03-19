const os = require( "os" );

class InfoService {
    constructor() {
    }

    getInfoService() {
        const cpuLength = () => os.cpus().length;
        return {
            args: process.argv,
            opSystem: process.platform,
            nodeVersion: process.version,
            rss: process.memoryUsage().rss,
            path: process.cwd(),
            processID: process.pid,
            cpus: cpuLength()
        }
    }
}

module.exports = {
    InfoService
}
