const io = require('./init').getIO();
const events = require('./events');


module.exports = {
    init: () => {
        io.on('connection', function (socket) {
            socket.on("event://command", async (data) => {
                socket.emit("event://get-message", events.getSenderMessage(data));

                switch (data) {
                    case 'history':
                        socket.emit("event://get-message", await events.getHistory(data));
                        break;

                    default:
                        socket.emit("event://get-message", await events.getOperationResult(data));
                }
            });
        });
    }
}