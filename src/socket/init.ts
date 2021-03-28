import socketConfig from '../config/socket';
import * as socketio from "socket.io";

let socketIO;

const init = httpServer => {
    socketIO = require('socket.io')(httpServer, {
        cors: {
            origin: `${socketConfig.corsOrigin}:${socketConfig.corsPort}`,
            methods: ["GET", "POST"],
            credentials: true
        }
    });
    return socketIO;
}

const getIO = () => {
    if(!socketIO) {
        throw new Error('Socket.io not initialized!');
    }
    return socketIO;
}

export {
    init,
    getIO
};
