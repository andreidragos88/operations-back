import * as ioService from './init';
import * as events from './events';

const io = ioService.getIO();

module.exports = {
    init: () => {
        io.on('connection', function (socket) {
            socket.on("event://command", async (data:string) => {
                socket.emit("event://get-message", events.getSenderMessage(data));

                switch (data) {
                    case 'history':
                        socket.emit("event://get-message", await events.getHistory());
                        break;

                    default:
                        socket.emit("event://get-message", await events.getOperationResult(data));
                }
            });
        });
    }
}