const os = require( "os" );

const getInfoService = async() => {
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

module.exports = {
    getInfoService
}
