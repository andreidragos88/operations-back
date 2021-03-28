import dotenv from 'dotenv';
dotenv.config();

import * as operationService from '../src/services/operation';
import * as socketEvents from '../src/socket/events';

let server = require('../app');

export {
    operationService,
    socketEvents
}