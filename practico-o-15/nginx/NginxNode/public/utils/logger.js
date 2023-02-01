const logger = require("pino");

exports.log = logger({
    transport: {
        target: 'pino-pretty',
        options: {
            messageKey: 'message'
        },
    },
    messageKey: 'message'
});

