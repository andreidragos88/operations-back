import dotenv from 'dotenv';
import express from "express";
import mongoose from 'mongoose';
import * as http from 'http';

dotenv.config();

import * as io from './src/socket/init';
import logger from './src/utils/logger';
import dbConfig from './src/config/db';

const app = express();
const server = new http.Server(app);

io.init(server);

const ioListeners = require('./src/socket/listeners');
ioListeners.init();

mongoose
    .connect(
        dbConfig.url,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    )
    .then(() => {
        server.listen(4000);
    })
    .catch((err) => logger.error(err));

const closeOnExit = async (event: string) => {
    try {
        await mongoose.disconnect();
        process.exit(0);
    } catch (e) {
        process.exit(1);
    }
};

process.once('SIGINT', () => closeOnExit('SIGINT'));
process.once('SIGTERM', () => closeOnExit('SIGTERM'));

export default server;
